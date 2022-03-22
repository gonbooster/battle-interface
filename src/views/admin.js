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

const Admin = () => {;
  const { active, account, library } = useWeb3React();
  const ghostBattle = useGhostBattle();
  const toast = useToast();

  

  const ownerMint = () => {
    
  
    ghostBattle.methods
      .ownerMint("A")
      .send({
        from: account
      })
      .on("transactionHash", (txHash) => {
        console.log(txHash)
      })
      .on("receipt", () => {
        console.log("ok")
      })
      .on("error", (error) => {
        console.log(error.message)
      });
  };

  const mintWhiteList = () => {
    
   
    ghostBattle.methods
      .notRevealedMint("B")
      .send({
        from: account,
        value: library.utils.toWei("0.2", "ether")
      })
      .on("transactionHash", (txHash) => {
        console.log(txHash)
      })
      .on("receipt", () => {
        console.log("ok")
      })
      .on("error", (error) => {
        console.log(error.message)
      });
  };

  const mint = () => {
    

    ghostBattle.methods
      .revealedMint("C")
      .send({
        from: account,
        value: library.utils.toWei("0.024", "ether")
      })
      .on("transactionHash", (txHash) => {
        console.log(txHash)
      })
      .on("receipt", () => {
        console.log("ok")
      })
      .on("error", (error) => {
        console.log(error.message)
      });
  };
  
  
  const reveal = () => {
    
    ghostBattle.methods
      .reveal()
      .send({
        from: account,
      })
      .on("transactionHash", (txHash) => {
        console.log(txHash)
      })
      .on("receipt", () => {
        console.log("ok")
      })
      .on("error", (error) => {
        console.log(error.message)
      });
  };
  
  const setPause = () => {
    

    ghostBattle.methods
      .setPause(false)
      .send({
        from: account,
      })
      .on("transactionHash", (txHash) => {
        console.log(txHash)
      })
      .on("receipt", () => {
        console.log("ok")
      })
      .on("error", (error) => {
        console.log(error.message)
      });
  };
  
  const setPayableAccount = () => {
    
    const name = prompt("Ingresa la dirección: ");
    if(!name){
      return false;
    }
    ghostBattle.methods
      .setPayableAccount(name)
      .send({
        from: account,
      })
      .on("transactionHash", (txHash) => {
        console.log(txHash)
      })
      .on("receipt", () => {
        console.log("ok")
      })
      .on("error", (error) => {
        console.log(error.message)
      });
  };
  
  const setMintCost = () => {
    
    const cost = prompt("Ingresa el costo: ");
    if(!cost){
      return false;
    }
    ghostBattle.methods
    .setMintCost(library.utils.toWei(cost, "ether"))
      .send({
        from: account,
      })
      .on("transactionHash", (txHash) => {
        console.log(txHash)
      })
      .on("receipt", () => {
        console.log("ok")
      })
      .on("error", (error) => {
        console.log(error.message)
      });
  };
  
  const setwhiteListMintCost = () => {
    
    const cost = prompt("Ingresa el costo: ");
    if(!cost){
      return false;
    }
    ghostBattle.methods
      .setwhiteListMintCost(library.utils.toWei(cost, "ether"))
      .send({
        from: account,
      })
      .on("transactionHash", (txHash) => {
        console.log(txHash)
      })
      .on("receipt", () => {
        console.log("ok")
      })
      .on("error", (error) => {
        console.log(error.message)
      });
  };
  
  const setNftPerWhiteListAddressLimit = () => {
    
    const setNftPerWhiteListAddressLimit = prompt("Ingresa el nombre del zombie: ");
    if(!setNftPerWhiteListAddressLimit){
      return false;
    }
    ghostBattle.methods
      .setNftPerWhiteListAddressLimit(setNftPerWhiteListAddressLimit)
      .send({
        from: account,
      })
      .on("transactionHash", (txHash) => {
        console.log(txHash)
      })
      .on("receipt", () => {
        console.log("ok")
      })
      .on("error", (error) => {
        console.log(error.message)
      });
  };
  
  const setBaseURI = () => {
    
    const setBaseURI = prompt("Ingresa el nombre del zombie: ");
    if(!setBaseURI){
      return false;
    }
    ghostBattle.methods
      .setBaseURI(setBaseURI)
      .send({
        from: account,
      })
      .on("transactionHash", (txHash) => {
        console.log(txHash)
      })
      .on("receipt", () => {
        console.log("ok")
      })
      .on("error", (error) => {
        console.log(error.message)
      });
  };
  
  const setFrontEndURI = () => {
    
    const setFrontEndURI = prompt("Ingresa el nombre del zombie: ");
    if(!setFrontEndURI){
      return false;
    }
    ghostBattle.methods
      .setFrontEndURI(setFrontEndURI)
      .send({
        from: account,
      })
      .on("transactionHash", (txHash) => {
        console.log(txHash)
      })
      .on("receipt", () => {
        console.log("ok")
      })
      .on("error", (error) => {
        console.log(error.message)
      });
  };
  
  const setMaxSupply = () => {
    
    const setMaxSupply = prompt("Ingresa el nombre del zombie: ");
    if(!setMaxSupply){
      return false;
    }
    ghostBattle.methods
      .setMaxSupply(setMaxSupply)
      .send({
        from: account
      })
      .on("transactionHash", (txHash) => {
        console.log(txHash)
      })
      .on("receipt", () => {
        console.log("ok")
      })
      .on("error", (error) => {
        console.log(error.message)
      });
  };
  
  const setCooldownFightTime = () => {
    
    const setCooldownFightTime = prompt("Ingresa el nombre del zombie: ");
    if(!setCooldownFightTime){
      return false;
    }
    ghostBattle.methods
      .setCooldownFightTime(setCooldownFightTime)
      .send({
        from: account,
      })
      .on("transactionHash", (txHash) => {
        console.log(txHash)
      })
      .on("receipt", () => {
        console.log("ok")
      })
      .on("error", (error) => {
        console.log(error.message)
      });
  };
  
  const setCooldownBornTime = () => {
    
    const setCooldownBornTime = prompt("Ingresa el nombre del zombie: ");
    if(!setCooldownBornTime){
      return false;
    }
    ghostBattle.methods
      .setCooldownBornTime(setCooldownBornTime)
      .send({
        from: account
      })
      .on("transactionHash", (txHash) => {
        console.log(txHash)
      })
      .on("receipt", () => {
        console.log("ok")
      })
      .on("error", (error) => {
        console.log(error.message)
      });
  };

  const whitelistUsers = () => {

    var otherNumbers = ["0x7e0332fB5a513F340338bb33720b560e4D728752","0xE49c7298Ec6e385B012C16dcF1e4e8d02fFA1652"];

    ghostBattle.methods
      .whitelistUsers(otherNumbers)
      .send({
        from: account
      })
      .on("transactionHash", (txHash) => {
        console.log(txHash)
      })
      .on("receipt", () => {
        console.log("ok")
      })
      .on("error", (error) => {
        console.log(error.message)
      });
  };
  const withdraw = () => {
  
    ghostBattle.methods
      .withdraw()
      .send({
        from: account
      })
      .on("transactionHash", (txHash) => {
        console.log(txHash)
      })
      .on("receipt", () => {
        console.log("ok")
      })
      .on("error", (error) => {
        console.log(error.message)
      });
  };

  const URIs = async () => {
  
    console.log("frontendURI", await ghostBattle.methods.frontendURI().call());
    console.log("baseURI", await ghostBattle.methods.baseURI().call());
    console.log("notRevealedURI", await ghostBattle.methods.notRevealedURI().call());
  };

  const times = async () => {
  
    console.log("cooldownFightTime", await ghostBattle.methods.cooldownFightTime().call());
    console.log("cooldownBornTime", await ghostBattle.methods.cooldownBornTime().call());
  };

  const costs = async () => {
  
    console.log("mintCost", await ghostBattle.methods.mintCost().call());
    console.log("NotRevealedMintCost", await ghostBattle.methods.NotRevealedMintCost().call());
  };

  const others = async () => {
    console.log("maxSupply", await ghostBattle.methods.maxSupply().call());
    console.log("totalSupply", await ghostBattle.methods.totalSupply().call());
    console.log("nftMintPerWhiteListAddressLimit", await ghostBattle.methods.nftMintPerWhiteListAddressLimit().call());
    console.log("payments account", await ghostBattle.methods.paymentsAccount().call());
    console.log("paused", await ghostBattle.methods.paused().call());
    console.log("revealed", await ghostBattle.methods.revealed().call());
    console.log("tokenURI", await ghostBattle.methods.tokenURI(0).call());
    console.log("balanceOf account 2", await ghostBattle.methods.balanceOf("0xE49c7298Ec6e385B012C16dcF1e4e8d02fFA1652").call());
  };

  
  const array = async () => {
  
   console.log("whitelistedAddresses", await ghostBattle.methods.whitelistedAddresses(0).call());
   console.log( "zombies",await ghostBattle.methods.zombies(0).call());
  };


  return (
    <Stack
    >
  
          <Button onClick={ownerMint}> ownerMint </Button>
          <Button onClick={mint}> Obtén tu ghost </Button>
          <Button onClick={mintWhiteList}> Obtén tu ghost WhiteList </Button>
          <Button onClick={reveal}> reveal </Button>
          <Button onClick={setPause}> Pausar contrato </Button>
          <Button onClick={setPayableAccount}> setPayableAccount </Button>
          <Button onClick={setMintCost}> setMintCost </Button>
          <Button onClick={setwhiteListMintCost}> setwhiteListMintCost </Button>
          <Button onClick={setNftPerWhiteListAddressLimit}> setNftPerWhiteListAddressLimit </Button>
          <Button onClick={setBaseURI}> setBaseURI </Button>
          <Button onClick={setFrontEndURI}> setFrontEndURI </Button>
          <Button onClick={setMaxSupply}> setMaxSupply </Button>
          <Button onClick={setCooldownFightTime}> setCooldownFightTime </Button>
          <Button onClick={setCooldownBornTime}> setCooldownBornTime </Button>
          <Button onClick={whitelistUsers}> whitelistUsers </Button>
          <Button onClick={withdraw}> withdraw </Button>
          <Button onClick={URIs}> URIs </Button>
          <Button onClick={times}> times </Button>
          <Button onClick={costs}> costs </Button>
          <Button onClick={others}> others </Button>
          <Button onClick={array}> array </Button>

         
    </Stack>
  );
};

export default Admin;
