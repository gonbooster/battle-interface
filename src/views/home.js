import {
  Stack,
  Flex,
  Heading,
  Text,
  Button,
  Image,
  Badge,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import useGhostBattle from "../hooks/useGhostBattle";
import { useCallback, useEffect, useState } from "react";

const Home = () => {
  const [isMinting, setIsMinting] = useState(false);
  const [mintCost, setMintCost] = useState(0);
  const [isRevealed, setRevealed] = useState(false);
  const [isInWhiteList, setIsInWhiteList] = useState(false);
  const { active, account, library } = useWeb3React();
  const ghostBattle = useGhostBattle();
  const toast = useToast();

  const getGhostsData = useCallback(async () => {
    if (ghostBattle) {
      const isWhitelisted = await ghostBattle.methods.isWhitelisted(account).call();
      setIsInWhiteList(isWhitelisted);
      const isRevealed = await ghostBattle.methods.revealed().call();
      setRevealed(isRevealed);
      const mintCost = await ghostBattle.methods.mintCost().call();
      const notRevealedMintCost = await ghostBattle.methods.notRevealedMintCost().call();
      setMintCost(library.utils.fromWei(isRevealed ? mintCost : notRevealedMintCost, "ether"));
    }
  }, [ghostBattle, account]);

  useEffect(() => {
    getGhostsData();
  }, [getGhostsData]);

  const notRevealedMint = () => {
    
    const name = prompt("Ingresa el nombre del zombie: ");
    if(!name){
      return false;
    }
    setIsMinting(true);
    getGhostsData();
    ghostBattle.methods
      .notRevealedMint(name)
      .send({
        from: account,
        value: library.utils.toWei(mintCost, "ether")
      })
      .on("transactionHash", (txHash) => {
        toast({
          title: "Transacción enviada",
          description: txHash,
          status: "info",
        });
      })
      .on("receipt", () => {
        setIsMinting(false);
        toast({
          title: "Transacción confirmada",
          description: "Nunca pares de aprender.",
          status: "success",
        });
        getGhostsData();
      })
      .on("error", (error) => {
        setIsMinting(false);
        toast({
          title: "Transacción fallida",
          description: error.message,
          status: "error",
        });
      });
  };
  const revealedMint = () => {
    
    const name = prompt("Ingresa el nombre del zombie: ");
    if(!name){
      return false;
    }
    setIsMinting(true);
    getGhostsData();
    ghostBattle.methods
      .revealedMint(name)
      .send({
        from: account,
        value: library.utils.toWei(mintCost, "ether")
      })
      .on("transactionHash", (txHash) => {
        toast({
          title: "Transacción enviada",
          description: txHash,
          status: "info",
        });
      })
      .on("receipt", () => {
        setIsMinting(false);
        toast({
          title: "Transacción confirmada",
          description: "Nunca pares de aprender.",
          status: "success",
        });
        getGhostsData();
      })
      .on("error", (error) => {
        setIsMinting(false);
        toast({
          title: "Transacción fallida",
          description: error.message,
          status: "error",
        });
      });
  };

  return (
    <Stack
      align={"center"}
      spacing={{ base: 8, md: 10 }}
      py={{ base: 20, md: 28 }}
      direction={{ base: "column-reverse", md: "row" }}
    >
      <Stack flex={1} spacing={{ base: 5, md: 10 }}>
        <Heading
          lineHeight={1.1}
          fontWeight={600}
          fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
        >
          <Text
            as={"span"}
            position={"relative"}
            _after={{
              content: "''",
              width: "full",
              height: "30%",
              position: "absolute",
              bottom: 1,
              left: 0,
              bg: "green.400",
              zIndex: -1,
            }}
          >
            Un Ghost
          </Text>
          <br />
          <Text as={"span"} color={"green.400"}>
            para pelear
          </Text>
        </Heading>
        <Text color={"gray.500"}>
          Ghost Battle es una colección de Avatares randomizados cuya metadata
          es almacenada on-chain. Poseen características únicas y sólo hay 10000
          en existencia.
        </Text>
        <Text color={"green.500"}>
          Cada Ghost se genera de forma secuencial basado en tu address,
          usa el previsualizador para averiguar cuál sería tu Ghost si
          minteas en este momento
        </Text>
        <Stack
          spacing={{ base: 4, sm: 6 }}
          direction={{ base: "column", sm: "row" }}
        >
          <Button
            rounded={"full"}
            size={"lg"}
            fontWeight={"normal"}
            px={6}
            colorScheme={"green"}
            bg={"green.400"}
            _hover={{ bg: "green.500" }}
            disabled={!ghostBattle || (!isRevealed && !isInWhiteList)}
            onClick={isRevealed ? revealedMint: notRevealedMint}
            isLoading={isMinting}
          >
            Obtén tu ghost
          </Button>
          <Link to="/ghosts">
            <Button rounded={"full"} size={"lg"} fontWeight={"normal"} px={6}>
              Galería
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Home;
