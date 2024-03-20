import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useSetRecoilState } from "recoil";
import authScreenAtom from "../atoms/authAtom";
import loggedUserAtom from "../atoms/loggedUserAtom";

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false);
  const setAuthScreenState = useSetRecoilState(authScreenAtom);
  const setLoggedUser = useSetRecoilState(loggedUserAtom);
  const [input, setInput] = useState({
    userName: "",
    password: "",
  });

  const handleClick = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });
      const data = await res.json();
      if(!data.success) {
        return alert(`${data.message}`);
      }
      localStorage.setItem('user-threads', JSON.stringify(data.user));
      setLoggedUser(data)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        style={{ maxWidth: "fit-content" }}
        spacing={8}
        mx={"auto"}
        maxW={"lg"}
        py={12}
        px={6}
      >
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
          className="md:w-[30vw]"
        >
          <Stack spacing={4}>
            <HStack>
              {/* <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input type="text" />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName">
                    <FormLabel>Last Name</FormLabel>
                    <Input type="text" />
                  </FormControl>
                </Box> */}
            </HStack>
            <FormControl isRequired>
              <FormLabel>User Name</FormLabel>
              <Input
                value={input.userName}
                onChange={(e) => setInput({ ...input, userName: e.target.value })}
                type="text"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  value={input.password}
                  onChange={(e) =>
                    setInput({ ...input, password: e.target.value })
                  }
                  type={showPassword ? "text" : "password"}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={handleClick}
              >
                Login
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Don't have and account?{" "}
                <Link
                  onClick={() => setAuthScreenState("signin")}
                  color={"blue.400"}
                >
                  Sign Up
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
