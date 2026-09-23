import {BetterDiscord} from "@shared/*";
import {GlobalModules} from "@global/*";
import {wpGetByKeys} from "../global/webpack";
import {encodeTypingStyle} from "../global/shared/regexHelpers.ts";
import {secondsightifyEncodeOnly, styled} from "@utils/*";

const {Components} = BetterDiscord;

const Animations = {
    PULSE: 1,
    RING: 2,
    WAVE: 3,
} as const;

const Suggestions = {
    YAPPING: 1,
    VENTING: 2,
    OVERSHARING: 3,
    BARKING: 4,
    BABBLING: 5,
    DAYDREAMING: 6,
    MEOWING: 7,
} as const;

const ModalModule: { Modal: React.FC<any> } = wpGetByKeys(["Modal"]);

export type TypingStyle = {
    animation: number;
    typingSuggestion: number;
    emojis: {
        emoji:
            | { oneofKind: "unicodeEmoji"; unicodeEmoji: string }
            | { oneofKind: "customEmojiId"; customEmojiId: string };
        animated: boolean;
    }[];
};

const Container = styled.div({
    display: "flex",
    flexDirection: "column",
    gap: 20,
});

const Section = styled.div({
    display: "flex",
    flexDirection: "column",
    gap: 8,
});

const Label = styled.div({
    fontSize: 16,
    fontWeight: 600,
    color: "var(--header-primary)",
});

const Row = styled.div({
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
});

const Preview = styled.div({
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontSize: 28,
    fontWeight: 600,
});

const PreviewEmpty = styled.span({
    opacity: 0.5,
    fontSize: 14,
    fontWeight: 400,
});

const optionButtonStyle = (selected: boolean) => ({
    backgroundColor: "var(--control-secondary-background-default)",
    color: "var(--text-default)",
    border: selected ? "1px solid #fff" : "1px solid transparent",
});

export default function StyleDots() {
    function handleClick() {
        GlobalModules.ModalModule.openModal((props: any) => (
            <ModalModule.Modal
                notice={{
                    type: "warning",
                    message: "This is still in early access/beta. Dis shit no work right now.",
                }}
                title="Typing Style"
                {...props}
            >
                <StyleDotsModal/>
            </ModalModule.Modal>
        ));
    }

    return <Components.Button onClick={handleClick}>Change</Components.Button>;
}

function StyleDotsModal() {
    const [animation, setAnimation] = React.useState<number>(Animations.PULSE);
    const [suggestion, setSuggestion] = React.useState<number>(Suggestions.MEOWING);
    const [emojiInput, setEmojiInput] = React.useState<string>("💗");
    const [animated, setAnimated] = React.useState<boolean>(false);

    const parsedEmojis = React.useMemo(() => parseEmojiInput(emojiInput, animated), [emojiInput, animated]);

    return (
        <Container>
            <Preview>
                {parsedEmojis.length === 0 && <PreviewEmpty>(no emojis)</PreviewEmpty>}
                {parsedEmojis.map((e, i) => (
                    <span key={i}>
                        {e.emoji.oneofKind === "unicodeEmoji" ? e.emoji.unicodeEmoji : `:${e.emoji.customEmojiId}`}
                    </span>
                ))}
            </Preview>

            <Section>
                <Label>Animation</Label>
                <Row>
                    {Object.entries(Animations).map(([name, value]) => (
                        <Components.Button
                            key={name}
                            onClick={() => setAnimation(value)}
                            style={optionButtonStyle(animation === value)}
                        >
                            {name.toLowerCase().substring(0, 1).toUpperCase() + name.toLowerCase().substring(1)}
                        </Components.Button>
                    ))}
                </Row>
            </Section>

            <Section>
                <Label>Suggestion</Label>
                <Row>
                    {Object.entries(Suggestions).map(([name, value]) => (
                        <Components.Button
                            key={name}
                            onClick={() => setSuggestion(value)}
                            style={optionButtonStyle(suggestion === value)}
                        >
                            {name.toLowerCase().substring(0, 1).toUpperCase() + name.toLowerCase().substring(1)}
                        </Components.Button>
                    ))}
                </Row>
            </Section>

            <Section>
                <Label>Emojis</Label>
                <Components.TextInput
                    initialValue={emojiInput}
                    onChange={(value: string) => setEmojiInput(value)}
                    placeholder="💗 😀 :123456789012345678"
                />
                <Components.SettingItem
                    name={"Animated"}
                    note={"Should we animate this Emoji?"}
                    inline={true}
                    onChange={(e) => setAnimated(e)}
                >
                    <Components.SwitchInput value={animated}/>
                </Components.SettingItem>
            </Section>

            <Components.Button
                onClick={async () => {
                    await navigator.clipboard.writeText(secondsightifyEncodeOnly(encodeTypingStyle({
                        animation,
                        typingSuggestion: suggestion,
                        emojis: parsedEmojis,
                    }))!);
                }}
            >
                Copy 3y3
            </Components.Button>
        </Container>
    );
}

const graphemeSegmenter = new Intl.Segmenter(undefined, {granularity: "grapheme"});

function parseEmojiInput(input: string, animated: boolean): TypingStyle["emojis"] {
    return input
        .split(/\s+/)
        .map((s) => s.trim())
        .filter(Boolean)
        .flatMap((token): TypingStyle["emojis"] => {
            if (token.startsWith(":")) {
                return token
                    .split(":")
                    .filter(Boolean)
                    .map((customEmojiId) => ({
                        emoji: {oneofKind: "customEmojiId" as const, customEmojiId},
                        animated,
                    }));
            }

            return Array.from(graphemeSegmenter.segment(token), (seg) => ({
                emoji: {oneofKind: "unicodeEmoji" as const, unicodeEmoji: seg.segment},
                animated,
            }));
        });
}