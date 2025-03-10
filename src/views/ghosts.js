import { useWeb3React } from "@web3-react/core";
import {
  Grid,
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  Button,
  FormHelperText,
  FormControl,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import PunkCard from "../components/ghost-card";
import Loading from "../components/loading";
import RequestAccess from "../components/request-access";
import { useGhostsData } from "../hooks/useGhostsData";
import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

const Ghosts = () => {
  const { search } = useLocation();
  const [address, setAddress] = useState(
    new URLSearchParams(search).get("address")
  );
  const [submitted, setSubmitted] = useState(true);
  const [validAddress, setValidAddress] = useState(true);
  const { push } = useHistory();
  const { active, library } = useWeb3React();
  const { ghosts, loading } = useGhostsData({
    owner: submitted && validAddress ? address : null,
  });

  const handleAddressChange = ({ target: { value } }) => {
    setAddress(value);
    setSubmitted(false);
    setValidAddress(false);
  };

  const submit = (event) => {
    event.preventDefault();

    if (address) {
      const isValid = library.utils.isAddress(address);
      setValidAddress(isValid);
      setSubmitted(true);
      if (isValid) push(`/ghosts?address=${address}`);
    } else {
      push("/ghosts");
    }
  };

  if (!active) return <RequestAccess />;

  return (
    <>
      <form onSubmit={submit}>
        <FormControl>
          <InputGroup mb={3}>
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon color="gray.300" />}
            />
            <Input
              isInvalid={false}
              value={address ?? ""}
              onChange={handleAddressChange}
              placeholder="Buscar por dirección"
            />
            <InputRightElement width="5.5rem">
              <Button type="submit" h="1.75rem" size="sm">
                Buscar
              </Button>
            </InputRightElement>
          </InputGroup>
          {submitted && !validAddress && (
            <FormHelperText>Dirección inválida</FormHelperText>
          )}
        </FormControl>
      </form>
      {loading ? (
        <Loading />
      ) : (
        <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
          {ghosts.map(({ zombie, name, image, tokenId }) => (
            <Link key={tokenId} to={`/ghosts/${tokenId}`}>
            <PunkCard image={image} name={name+' '+zombie.name} />
            </Link>
          ))}
        </Grid>
      )}
    </>
  );
};

export default Ghosts;
