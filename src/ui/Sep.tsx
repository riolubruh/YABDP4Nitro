import { styled } from "@utils/*";

export const Separator = styled.div({
	width: "100%",
	height: "2px",
	margin: "10px 0",
	borderRadius: "100%",
	background: "var(--border-subtle)",
});

const Wrapper = styled.div({
	display: "flex",
	alignItems: "center",
	margin: "10px 0",
});

const Line = styled.div({
	flex: 1,
	height: "2px",
	borderRadius: "100%",
	background: "var(--border-subtle)",
});

const Label = styled.span({
	margin: "0 10px",
	color: "var(--text-muted)",
	fontSize: "12px",
	fontWeight: 600,
	textTransform: "uppercase",
	whiteSpace: "nowrap",
});

export function SepWithText({ children }: { children: React.ReactNode }) {
	return (
		<Wrapper>
			<Line />
			<Label>{children}</Label>
			<Line />
		</Wrapper>
	);
}
