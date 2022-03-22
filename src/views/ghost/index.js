import {
  Stack,
  Heading,
  Text,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Grid,
  useDisclosure,
  Button,
  Tag,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";

import PunkCard from "../../components/ghost-card";
import SimpleDateTime  from 'react-simple-timestamp-to-date';
import { useWeb3React } from "@web3-react/core";
import RequestAccess from "../../components/request-access";
import GhostCard from "../../components/ghost-card";
import { useGhostData, useMyGhostsData } from "../../hooks/useGhostsData";
import { useParams } from "react-router-dom";
import Loading from "../../components/loading";
import { useState } from "react";
import useGhostBattle from "../../hooks/useGhostBattle";
import Countdown, { zeroPad } from 'react-countdown';
import * as moment from 'moment';
import RadarChart from 'react-svg-radar-chart';
import 'react-svg-radar-chart/build/css/index.css'


const captions = {
  // columns
  attack: 'attack',
  defense: 'defense',
  life: 'life'
};
const Ghost = () => {
  const { active, account, library } = useWeb3React();
  const { tokenId } = useParams();
  const { loading, ghost, update } = useGhostData(tokenId);

  const { ghosts } = useMyGhostsData();
  const ghostBattle = useGhostBattle();
  const toast = useToast();
  const [transfering, setTransfering] = useState(false);
  const [value, setValue] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getAttackPrice =  async (attak, deffense) =>{
    let hitPoints = await ghostBattle.methods
      .getEffortForWin(attak,deffense)
      .call();
    ghostBattle.methods
    .attack(value, ghost.tokenId)
    .send({
      from: account,
      value: library.utils.toWei(String((Number(hitPoints)+1)/1000), "ether")
    })
    .on("transactionHash", (txHash) => {
      toast({
        title: "Transacción enviada",
        description: txHash,
        status: "info",
      });
      onClose()
    })
    .on("receipt", () => {
      toast({
        title: "Transacción confirmada",
        description: "Nunca pares de aprender.",
        status: "success",
      });
      onClose()
    })
    .on("error", (error) => {
      console.log(error)
      toast({
        title: "Transacción fallida",
        description: error.message,
        status: "error",
      });
      onClose()
    });

  };

  
  const getDNA =  async () =>{
   
  };


  const attack = () =>{
    let attacker = ghosts.find(e => e.tokenId == value);
    console.log("atacante",attacker.tokenId,'a',attacker.zombie.attack)
    console.log("defensor",ghost.tokenId,"d",ghost.zombie.defense,"l",ghost.zombie.life)
    getDNA(attacker.tokenId,ghost.tokenId);
    getAttackPrice(attacker.tokenId, ghost.tokenId);
    
  }

  const bornRenderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <span>Nacido el<Tag ml={2} colorScheme="green"><SimpleDateTime dateFormat="DMY" dateSeparator="/"  timeSeparator=":">{ghost.zombie.readyToFight}</SimpleDateTime></Tag></span>;
    } else {
      // Render a countdown
      
      return <span>Tiempo restante para la eclosion:<Tag ml={2} colorScheme="green">{zeroPad(days)}:{zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}</Tag></span>;
    }
  };
  const ReadyToFight = () => <span>ready to fight!</span>;
  const data = [
    {
      data: {
        attack: ghost.zombie ? Number(ghost.zombie.attack)/(ghost.zombie.generation*10) : 0,
        defense: ghost.zombie ? Number(ghost.zombie.defense)/(ghost.zombie.generation*10) : 0,
        life: ghost.zombie ? Number(ghost.zombie.life)/(ghost.zombie.generation*10) : 0,
      },
      meta: { color: 'blue' }
    }
  ];
  const changeName = () => {

    const newName = prompt("Ingresa el nuevo nombre del zombie: ");
    if(!newName){
      return false;
    }
    ghostBattle.methods
      .changeName(ghost.tokenId,newName)
      .send({
        from: account,
      })
      .on("transactionHash", (txHash) => {
        toast({
          title: "Transacción enviada",
          description: txHash,
          status: "info",
        });
      })
      .on("receipt", () => {
        toast({
          title: "Transacción confirmada",
          description: "Nunca pares de aprender.",
          status: "success",
        });
      })
      .on("error", (error) => {
        toast({
          title: "Transacción fallida",
          description: error.message,
          status: "error",
        });
      });
  };
  const buyToken = () => {
  setTransfering(true);
    ghostBattle.methods
      .buyToken(ghost.tokenId)
      .send({
        from: account,
        value: ghost.price,
      })
      .on("transactionHash", (txHash) => {
        setTransfering(false);
        toast({
          title: "Transacción enviada",
          description: txHash,
          status: "info",
        });
      })
      .on("receipt", () => {
        setTransfering(false);
        toast({
          title: "Transacción confirmada",
          description: "Nunca pares de aprender.",
          status: "success",
        });
      })
      .on("error", (error) => {
        setTransfering(false);
        toast({
          title: "Transacción fallida",
          description: error.message,
          status: "error",
        });
      });
  };
  const coach = () => {
    ghostBattle.methods
      .coach(ghost.tokenId)
      .send({
        from: account,
      })
      .on("transactionHash", (txHash) => {
        toast({
          title: "Transacción enviada",
          description: txHash,
          status: "info",
        });
      })
      .on("receipt", () => {
        toast({
          title: "Transacción confirmada",
          description: "Nunca pares de aprender.",
          status: "success",
        });
      })
      .on("error", (error) => {
        toast({
          title: "Transacción fallida",
          description: error.message,
          status: "error",
        });
      });
  };
  const setTokenPrice = () => {
    const price = prompt("Ingresa el nuevo precio: ");
    if(!price){
      return false;
    }
    ghostBattle.methods
      .setTokenPrice(ghost.tokenId, library.utils.toWei(price, "ether"))
      .send({
        from: account,
      })
      .on("transactionHash", (txHash) => {
        toast({
          title: "Transacción enviada",
          description: txHash,
          status: "info",
        });
      })
      .on("receipt", () => {
        toast({
          title: "Transacción confirmada",
          description: "Nunca pares de aprender.",
          status: "success",
        });
      })
      .on("error", (error) => {
        toast({
          title: "Transacción fallida",
          description: error.message,
          status: "error",
        });
      });
  };



  if (!active) return <RequestAccess />;

  if (loading) return <Loading />;

  return (
    <Stack
      spacing={{ base: 8, md: 10 }}
      py={{ base: 5 }}
      direction={{ base: "column", md: "row" }}
    >
      <Stack>
        <GhostCard
          mx={{
            base: "auto",
            md: 0,
          }}
          name={ghost.zombie.name}
          image={ghost.image}
        />
        <Button
          onClick={onOpen}
          disabled={account === ghost.owner}
          colorScheme="green"
          isLoading={transfering}
        >
          {account === ghost.owner ? "No eres el dueño" : "Atacar"}
        </Button>
        <Button
          onClick={buyToken}
          disabled={account === ghost.owner}
          colorScheme="green"
          isLoading={transfering}
        >
          {account === ghost.owner ? "No eres el dueño" : "Comprar por "+library.utils.fromWei(ghost.price, "ether")+" Ether"}
        </Button>
        <Button
          onClick={setTokenPrice}
          disabled={account !== ghost.owner}
          colorScheme="green"
          isLoading={transfering}
        >
          {account !== ghost.owner ? "No eres el dueño" : "Cambiar el precio"}
        </Button>
        <Button
          onClick={changeName}
          disabled={account !== ghost.owner}
          colorScheme="green"
          isLoading={transfering}
        >
          {account !== ghost.owner ? "No eres el dueño" : "Cambiar nombre"}
        </Button>
        <Button
          onClick={coach}
          disabled={account !== ghost.owner}
          colorScheme="green"
          isLoading={transfering}
        >
          {account !== ghost.owner ? "No eres el dueño" : "Entrenar"}
        </Button>
      </Stack>
      <Stack width="100%" spacing={5}>
        <Heading>{ghost.name} - {ghost.zombie.name}</Heading>
        <Text fontSize="xl">{ghost.description}</Text>
        <RadarChart
          captions={captions}
          data={data}
          size={450}
        />
        <Text fontWeight={600}>
          DNA:
          <Tag ml={2} colorScheme="green">
            {ghost.zombie.dna}
          </Tag>
        </Text>
        <Text fontWeight={600}>
          Owner:
          <Tag ml={2} colorScheme="green">
            {ghost.owner}
          </Tag>
        </Text>
        <Text fontWeight={600}>
          Generación:
          <Tag ml={2} colorScheme="green">
            {ghost.zombie.generation}
          </Tag>
        </Text>
        <Text fontWeight={600}>
          ataque:
          <Tag ml={2} colorScheme="green">
            {ghost.zombie.attack}
          </Tag>
        </Text>
        <Text fontWeight={600}>
          defensa:
          <Tag ml={2} colorScheme="green">
            {ghost.zombie.defense}
          </Tag>
        </Text>
        <Text fontWeight={600}>
          vida:
          <Tag ml={2} colorScheme="green">
            {ghost.zombie.life}
          </Tag>
        </Text>

        <Text fontWeight={600}>
          Tiempo restante para volver a combatir:
          <Tag ml={2} colorScheme="green">        
            <Countdown date={new Date(moment.unix(ghost.zombie.fight).format("yyyy-MM-DDTHH:mm:ss")).getTime()}>
              <ReadyToFight />
            </Countdown>
          </Tag>
        </Text>
        <Text fontWeight={600}>   
          <Countdown date={new Date(moment.unix(ghost.zombie.born).format("yyyy-MM-DDTHH:mm:ss")).getTime()}
            renderer={bornRenderer}
          />
        </Text>
      </Stack>

<Modal isOpen={isOpen} onClose={onClose}>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>Modal Title</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
      <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
      <RadioGroup onChange={event => setValue(event)}>
        {ghosts.map(({ zombie, name, image, tokenId }) => (
            <Radio value={tokenId}>
              <PunkCard image={image} name={name} >
                </PunkCard>
            </Radio>
        ))}
        </RadioGroup>
      </Grid>
    </ModalBody>

    <ModalFooter>
      <Button colorScheme='blue' mr={3} onClick={onClose}>
        Close
      </Button>
      <Button variant='ghost' onClick={attack}>Atacar</Button>
    </ModalFooter>
  </ModalContent>
</Modal>
    </Stack>
  );
};

export default Ghost;
