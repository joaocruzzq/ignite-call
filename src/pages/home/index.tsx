import { Heading, Text } from "@ignite-ui/react";
import { Container, Hero, Preview } from "./styles";

import Image from "next/image";
import previewImage from "../../assets/mainIMG.png";
import heroBackground from "../../assets/mainBG.png"

import { ClaimUsernameForm } from "./components/claim-username-form";

export default function Home() {
  return (
    <Container>
      <Hero>
        <Heading size="4xl">
          Agendamento descomplicado
        </Heading>

        <Text size="xl">
          Conecte seu calendário e permita que as pessoas marquem agendamentos no seu tempo livre.
        </Text>

        <ClaimUsernameForm />
      </Hero>

      <Image
        src={heroBackground}
        alt="Grid pontilhado"
        height={682} style={{ position: "absolute", marginLeft: -238, zIndex: -1 }}
      />

      <Preview>
        <Image
          priority
          height={400}
          quality={100}
          src={previewImage}
          alt="Calendário simbolizando aplicação em funcionamento"
        />
      </Preview>
    </Container>
  )
}
