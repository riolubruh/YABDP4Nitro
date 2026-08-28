import {BetterDiscord} from "@shared/*";
import {getDebugSnapshot} from "@patches/*";

const {React} = BetterDiscord;

const LEVEL_COLOR: Record<string, string> = {warn: "#f0b232", error: "#f23f43"};

export default function DebugPanel() {
    const [snapshot, setSnapshot] = React.useState(getDebugSnapshot());

    React.useEffect(() => {
        const id = setInterval(() => setSnapshot(getDebugSnapshot()), 1000);
        return () => clearInterval(id);
    }, []);

    const {log, patches, stillPending} = snapshot;
    const patchEntries = Object.entries(patches) as [string, { ok: boolean; ms: number; error?: string }][];

    return (
        <div style={{display: "flex", flexDirection: "column", gap: 14, fontSize: 13}}>
            {!!stillPending.length && (
                <Section title={`Still Hanging (${stillPending.length})`}>
                    {stillPending.map((p: any) => (
                        <Row key={p.label} left={p.label} right={`${(p.elapsedMs / 1000).toFixed(1)}s`}
                             color="#f0b232"/>
                    ))}
                </Section>
            )}

            <Section title={`Patches (${patchEntries.length})`} empty="No patches have loaded yet.">
                {patchEntries.map(([name, s]) => (
                    <Row
                        key={name}
                        left={name}
                        right={s.ok ? `${s.ms}ms` : "failed"}
                        color={s.ok ? "#23a55a" : "#f23f43"}
                        sub={s.error}
                    />
                ))}
            </Section>

            <Section title={`Log (${log.length})`} empty="No warnings or errors — looking good.">
                {[...log].reverse().map((e, i) => (
                    <Row key={i} left={e.msg} right={`+${e.t}ms`} color={LEVEL_COLOR[e.level]}/>
                ))}
            </Section>
        </div>
    );
}

function Section({title, children, empty}: { title: string; children: React.ReactNode; empty?: string }) {
    const items = React.Children.toArray(children).filter(Boolean);

    return (
        <div>
            <div
                style={{
                    color: "var(--text-muted)",
                    fontWeight: 600,
                    marginBottom: 6,
                    textTransform: "uppercase",
                    fontSize: 11,
                    letterSpacing: 0.3,
                }}
            >
                {title}
            </div>
            {items.length ? (
                <div style={{display: "flex", flexDirection: "column", gap: 2, maxHeight: 240, overflowY: "auto"}}>
                    {items}
                </div>
            ) : (
                empty && <div style={{color: "var(--text-muted)", fontSize: 12, fontStyle: "italic"}}>{empty}</div>
            )}
        </div>
    );
}

function Row({left, right, color, sub}: { left: string; right: string; color: string; sub?: string }) {
    return (
        <div style={{padding: "6px 8px", borderRadius: 4}}>
            <div style={{display: "flex", justifyContent: "space-between", gap: 8}}>
                <span style={{color: "var(--text-normal)", wordBreak: "break-word"}}>{left}</span>
                <span style={{color, flexShrink: 0, fontFamily: "var(--font-code)"}}>{right}</span>
            </div>
            {sub && (
                <div style={{color: "var(--text-muted)", fontSize: 11, marginTop: 2, wordBreak: "break-word"}}>
                    {sub}
                </div>
            )}
        </div>
    );
}