import { Container, Flex, Heading, List, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { useDrop } from "react-dnd";
import Player from "./components/Player";

function App() {
  const [players, setPlayer] = useState([
    { name: "Player 1" },
    { name: "Player 2" },
    { name: "Player 3" },
    { name: "Player 4" },
    { name: "Player 5" },
  ]);

  const [team, setTeam] = useState([]);

  const [{ isOver }, addToTeamRef] = useDrop({
    accept: "player",
    collect: (monitor) => ({ isOver: !!monitor.isOver() }),
  });

  const [{ isOver: isPlayerOver }, removeFromTeamRef] = useDrop({
    accept: "team",
    collect: (monitor) => ({ isOver: !!monitor.isOver() }),
  });

  const movePlayerToTeam = (item) => {
    setPlayer((prev) => prev.filter((_, i) => item.index !== i));
    setTeam((prev) => [...prev, item]);
  };

  const removePlayerFromTeam = (item) => {
    setTeam((prev) => prev.filter((_, i) => item.index !== i));
    setPlayer((prev) => [...prev, item]);
  };

  return (
    <Container maxW="800px" p={4}>
      <Heading p="2" align="center" color="GrayText">
        React Drag & Drop
      </Heading>

      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        height="90vh"
        align="center"
      >
        <Stack width={{ base: "100%", md: "300px" }} mb={{ base: 4, md: 0 }}>
          <Heading fontSize="3xl" color="yellow.800" textAlign="center">
            IN Process
          </Heading>
          <List
            bgGradient={
              isPlayerOver
                ? "linear(to-b, yellow.900, yellow.900)"
                : "linear(to-b, yellow.900, yellow.900)"
            }
            ref={removeFromTeamRef}
            p="4"
            minH="70vh"
            boxShadow="xl"
            borderRadius="md"
          >
            {players.map((p, i) => (
              <Player
                item={p}
                key={i}
                playerType="player"
                onDropPlayer={movePlayerToTeam}
                index={i}
              />
            ))}
          </List>
        </Stack>
        <Stack width={{ base: "100%", md: "300px" }}>
          <Heading fontSize="3xl" color="teal.800" textAlign="center">
            Selected
          </Heading>
          <List
            bgGradient={
              isOver
                ? "linear(to-b, teal.700, teal.700)"
                : "linear(to-b, teal.700, teal.700)"
            }
            ref={addToTeamRef}
            minH="70vh"
            boxShadow="xl"
            borderRadius="md"
            p="4"
          >
            {team.map((p, i) => (
              <Player
                item={p}
                key={i}
                index={i}
                playerType="team"
                onDropPlayer={removePlayerFromTeam}
              />
            ))}
          </List>
        </Stack>
      </Flex>
    </Container>
  );
}

export default App;
