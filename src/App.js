import { ethers } from "ethers";
import { useCallback, useEffect, useRef, useState } from "react";
import GreetingsABI from "./artifacts/contracts/Greeter.sol/Greeter.json";

function App() {
  const inputRef = useRef();
  const [data, setData] = useState("");
  const [contract, setContract] = useState("");
  const getGreeting = async () => {
    const _data = await contract.greet();
    setData(_data);
  };
  const setGreeting = async () => {
    const value = inputRef.current.value;
    if (value) {
      const _transaction = await contract.setGreeting(value);
      await _transaction.wait();
      getGreeting();
      inputRef.current.value = "";
    } else {
      alert("type something in input field");
    }
  };
  const init = useCallback(async () => {
    if (typeof window.ethereum !== "undefined") {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const _contact = new ethers.Contract(
        "0x5FbDB2315678afecb367f032d93F642f64180aa3",
        GreetingsABI.abi,
        signer
      );
      setContract(_contact);
    }
  }, []);
  useEffect(() => {
    init();
  }, []);
  useEffect(() => {
    if (contract) {
      getGreeting();
    }
  }, [contract]);
  return (
    <div>
      <button onClick={getGreeting}>greet</button>
      <button onClick={setGreeting}>set greeting</button>
      <input type="text" ref={inputRef} placeholder="type something here" />
      {data ? <p>{data}</p> : null}
    </div>
  );
}

export default App;
