import { useMemo } from "react";
import { useWeb3React } from "@web3-react/core";
import GhostBattleArtifact from "../../config/web3/artifacts/GhostBattle";

const { address, abi } = GhostBattleArtifact;

const useGhostBattle = () => {
  const { active, library, chainId } = useWeb3React();

  const ghostBattle = useMemo(() => {
    if (active) return new library.eth.Contract(abi, address[chainId]);
  }, [active, chainId, library?.eth?.Contract]);

  return ghostBattle;
};

export default useGhostBattle;
