import { Body, Container, Head, Heading, Html, Preview, Text } from "@react-email/components";

export default function ContactMessage({ name, email, message }: { name: string; email: string; message: string }) {
  return (
    <Html>
      <Head />
      <Preview>New portfolio inquiry from {name}</Preview>
      <Body style={{ fontFamily: "system-ui, sans-serif" }}>
        <Container>
          <Heading>{name}</Heading>
          <Text><a href={`mailto:${email}`}>{email}</a></Text>
          <Text style={{ whiteSpace: "pre-wrap" }}>{message}</Text>
        </Container>
      </Body>
    </Html>
  );
}
