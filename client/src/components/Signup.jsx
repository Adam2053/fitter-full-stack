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
  } from '@chakra-ui/react'
  import { useState } from 'react'
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useSetRecoilState } from 'recoil'
import authScreenAtom from '../atoms/authAtom'
import loggedUserAtom from '../atoms/loggedUserAtom'
  
  export default function Signup() {
    const [showPassword, setShowPassword] = useState(false)
    const setAuthScreenState = useSetRecoilState(authScreenAtom);
    const setLoggedUser = useSetRecoilState(loggedUserAtom);
    const [input, setInput] = useState({
      userName: '',
      password: '',
      confirmPassword: '',
      email: '',
    })
    const handleSignup = async() => {
      try {
        if(input.password != input.confirmPassword){
          return alert('Passwords do not match')
        }
        const res = await fetch("http://localhost:8000/api/v1/auth/signup",{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body: JSON.stringify(input)
        })
        const data = await res.json();
      
        if(!data.success) {
          return alert(`${data.message}`)
        }
        localStorage.setItem('user-thread', JSON.stringify(data.data))
        setLoggedUser(data)
      } catch (error) {
        console.log(error)
      }
    }
  
    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Sign up
            </Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool features ✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <HStack>
                {/* <Box>
                  <FormControl isRequired>
                    <FormLabel>Full Name</FormLabel>
                    <Input type="text" />
                  </FormControl>
                </Box> */}
                <Box>
                  <FormControl isRequired>
                    <FormLabel>Username</FormLabel>
                    <Input value={input.userName} onChange={(e)=> setInput({...input,userName:e.target.value})} type="text" />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl isRequired>
                <FormLabel>Email address</FormLabel>
                <Input value={input.email} onChange={(e)=> setInput({...input,email:e.target.value})} type="email" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input value={input.password} onChange={(e)=> setInput({...input,password:e.target.value})} type={showPassword ? 'text' : 'password'} />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() => setShowPassword((showPassword) => !showPassword)}>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                  <Input value={input.confirmPassword} onChange={(e)=> setInput({...input,confirmPassword:e.target.value})} type={showPassword ? 'text' : 'password'} />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() => setShowPassword((showPassword) => !showPassword)}>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  onClick={handleSignup}
                  >
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  Already a user? <Link onClick={()=> setAuthScreenState("login")} color={'blue.400'}>Login</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    )
  }