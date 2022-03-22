import { useWeb3React } from "@web3-react/core";
import { useCallback, useEffect, useState } from "react";
import useGhostBattle from "../useGhostBattle";

const getGhostData = async ({ ghostBattle, tokenId }) => {
  const [
    tokenURI,
    zombie,
    price,
    owner,
    accessoriesType,
    clotheColor,
    clotheType,
    eyeType,
    eyeBrowType,
    facialHairColor,
    facialHairType,
    hairColor,
    hatColor,
    mouthType,
    skinColor,
    topType,
  ] = await Promise.all([
    ghostBattle.methods.tokenURI(tokenId).call(),
    ghostBattle.methods.getZombie(tokenId).call(),
    ghostBattle.methods.tokenPrices(tokenId).call(),
    ghostBattle.methods.ownerOf(tokenId).call(),
    ghostBattle.methods.getAtribute("accessoriesType",tokenId).call(),
    ghostBattle.methods.getAtribute("clotheColor",tokenId).call(),
    ghostBattle.methods.getAtribute("clotheType",tokenId).call(),
    ghostBattle.methods.getAtribute("eyeType",tokenId).call(),
    ghostBattle.methods.getAtribute("eyeBrowType",tokenId).call(),
    ghostBattle.methods.getAtribute("facialHairColor",tokenId).call(),
    ghostBattle.methods.getAtribute("facialHairType",tokenId).call(),
    ghostBattle.methods.getAtribute("hairColor",tokenId).call(),
    ghostBattle.methods.getAtribute("hatColor",tokenId).call(),
    ghostBattle.methods.getAtribute("mouthType",tokenId).call(),
    ghostBattle.methods.getAtribute("skinColor",tokenId).call(),
    ghostBattle.methods.getAtribute("topType",tokenId).call(),
  ]);
console.log(zombie)
  const responseMetadata = await fetch(tokenURI);
  const metadata = await responseMetadata.json();
  return {
    tokenId,
    price,
    attributes: {
      accessoriesType,
      clotheColor,
      clotheType,
      eyeType,
      eyeBrowType,
      facialHairColor,
      facialHairType,
      hairColor,
      hatColor,
      mouthType,
      skinColor,
      topType,
    },
    tokenURI,
    zombie,
    owner,
    ...metadata,
  };
};

const useMyGhostsData = () => {
  const [ghosts, setGhosts] = useState([]);
  const { library, account } = useWeb3React();
  const [loading, setLoading] = useState(true);
  const ghostBattle = useGhostBattle();
  const update = useCallback(async () => {
    if (ghostBattle) {
      setLoading(true);
      let tokenIds;


        const balanceOf = await ghostBattle.methods.balanceOf(account).call();

        const tokenIdsOfOwner = new Array(Number(balanceOf))
          .fill()
          .map((_, index) =>
          ghostBattle.methods.tokenOfOwnerByIndex(account, index).call()
          );

        tokenIds = await Promise.all(tokenIdsOfOwner);


      const ghostsPromise = tokenIds.map((tokenId) =>
        getGhostData({ tokenId, ghostBattle })
      );


      const ghosts = await Promise.all(ghostsPromise);
      console.log(ghosts)
      setGhosts(ghosts);
      setLoading(false);
    }
  }, [ghostBattle, library?.utils]);

  useEffect(() => {
    update();
  }, [update]);

  return {
    loading,
    ghosts,
    update,
  };
};

// Plural
const useGhostsData = ({ owner = null } = {}) => {
  const [ghosts, setGhosts] = useState([]);
  const { library, account } = useWeb3React();
  const [loading, setLoading] = useState(true);
  const ghostBattle = useGhostBattle();
  const update = useCallback(async () => {
    if (ghostBattle) {
      setLoading(true);

      let tokenIds;
        const totalSupply = await ghostBattle.methods.totalSupply().call();
        tokenIds = new Array(Number(totalSupply))
          .fill()
          .map((_, index) => index.toString());

        const balanceOf = await ghostBattle.methods.balanceOf(account).call();
        const tokenIdsOfOwner = new Array(Number(balanceOf))
          .fill()
          .map((_, index) =>
          ghostBattle.methods.tokenOfOwnerByIndex(account, index).call()
          );
        let ownerTokenIds = await Promise.all(tokenIdsOfOwner);
        let NoOwnedTokensIds = tokenIds.filter(item => !ownerTokenIds.includes(item));

      
      const ghostsPromise = NoOwnedTokensIds.map((tokenId) =>
        getGhostData({ tokenId, ghostBattle })
      );


      const ghosts = await Promise.all(ghostsPromise);
      setGhosts(ghosts);
      setLoading(false);
    }
  }, [ghostBattle, owner, library?.utils]);

  useEffect(() => {
    update();
  }, [update]);

  return {
    loading,
    ghosts,
    update,
  };
};

// Singular
const useGhostData = (tokenId = null) => {
  const [ghost, setGhost] = useState({});
  const [loading, setLoading] = useState(true);
  const ghostBattle = useGhostBattle();

  const update = useCallback(async () => {
    if (ghostBattle && tokenId != null) {
      setLoading(true);

      const toSet = await getGhostData({ tokenId, ghostBattle });
      setGhost(toSet);

      setLoading(false);
    }
  }, [ghostBattle, tokenId]);

  useEffect(() => {
    update();
  }, [update]);

  return {
    loading,
    ghost,
    update,
  };
};

export { useMyGhostsData, useGhostsData, useGhostData };
