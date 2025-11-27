// src/app/debug-sanity/page.tsx
"use client"

import { useState, useEffect } from 'react'
import { Box, Container, VStack, Text, Button, Code, Alert, AlertIcon, Spinner } from '@chakra-ui/react'

interface TestResult {
  name: string
  status: 'pending' | 'success' | 'error'
  message: string
  data?: any
}

export default function DebugSanity() {
  const [results, setResults] = useState<TestResult[]>([])
  const [loading, setLoading] = useState(true)

  const addResult = (result: TestResult) => {
    setResults(prev => [...prev, result])
  }

  const runAllTests = async () => {
    setLoading(true)
    setResults([])

    // Test 1: Basic fetch to Sanity API
    addResult({
      name: 'Basic API Connection',
      status: 'pending',
      message: 'Testing connection to Sanity API...'
    })

    try {
      const basicUrl = 'https://7cl2mgrx.api.sanity.io/v2025-10-05/data/query/myblogcontent?query=count(*)'
      const response = await fetch(basicUrl)
      
      if (response.ok) {
        const data = await response.json()
        addResult({
          name: 'Basic API Connection',
          status: 'success',
          message: `✅ Connected successfully! Found ${data.result} documents`,
          data: data
        })
      } else {
        addResult({
          name: 'Basic API Connection',
          status: 'error',
          message: `❌ Failed with status: ${response.status} ${response.statusText}`
        })
      }
    } catch (error: any) {
      addResult({
        name: 'Basic API Connection',
        status: 'error',
        message: `❌ Connection failed: ${error.message}`
      })
    }

    // Test 2: CORS Test
    addResult({
      name: 'CORS Test',
      status: 'pending',
      message: 'Testing CORS configuration...'
    })

    try {
      const corsUrl = 'https://7cl2mgrx.api.sanity.io/v2025-10-05/data/query/myblogcontent?query=*[]'
      const response = await fetch(corsUrl, {
        method: 'GET',
        credentials: 'include'
      })
      
      const corsHeader = response.headers.get('access-control-allow-origin')
      
      if (response.ok) {
        addResult({
          name: 'CORS Test',
          status: 'success',
          message: `✅ CORS working! Header: ${corsHeader || 'Not set'}`,
          data: { corsHeader }
        })
      } else {
        addResult({
          name: 'CORS Test',
          status: 'error',
          message: `❌ CORS blocked: ${response.status} ${response.statusText}`
        })
      }
    } catch (error: any) {
      addResult({
        name: 'CORS Test',
        status: 'error',
        message: `❌ CORS test failed: ${error.message}`
      })
    }

    // Test 3: Project Existence Test
    addResult({
      name: 'Project & Dataset Check',
      status: 'pending',
      message: 'Checking if project and dataset exist...'
    })

    try {
      const datasetsUrl = 'https://7cl2mgrx.api.sanity.io/v1/projects/7cl2mgrx'
      const response = await fetch(datasetsUrl)
      
      if (response.ok) {
        const data = await response.json()
        addResult({
          name: 'Project & Dataset Check',
          status: 'success',
          message: '✅ Project exists and is accessible',
          data: data
        })
      } else {
        addResult({
          name: 'Project & Dataset Check',
          status: 'error',
          message: `❌ Project check failed: ${response.status} ${response.statusText}`
        })
      }
    } catch (error: any) {
      addResult({
        name: 'Project & Dataset Check',
        status: 'error',
        message: `❌ Project check failed: ${error.message}`
      })
    }

    // Test 4: Actual Data Fetch
    addResult({
      name: 'Data Fetch Test',
      status: 'pending',
      message: 'Attempting to fetch actual data...'
    })

    try {
      const dataUrl = 'https://7cl2mgrx.api.sanity.io/v2025-10-05/data/query/myblogcontent?query=*[]'
      const response = await fetch(dataUrl)
      
      if (response.ok) {
        const data = await response.json()
        addResult({
          name: 'Data Fetch Test',
          status: 'success',
          message: `✅ Data fetch successful! Found ${data.result?.length || 0} documents`,
          data: data.result
        })
      } else {
        addResult({
          name: 'Data Fetch Test',
          status: 'error',
          message: `❌ Data fetch failed: ${response.status} ${response.statusText}`
        })
      }
    } catch (error: any) {
      addResult({
        name: 'Data Fetch Test',
        status: 'error',
        message: `❌ Data fetch failed: ${error.message}`
      })
    }

    setLoading(false)
  }

  useEffect(() => {
    runAllTests()
  }, [])

  return (
    <Box minH="100vh" bg="gray.50" py={8}>
      <Container maxW="container.xl">
        <VStack spacing={8} align="stretch">
          <Box textAlign="center">
            <Text fontSize="3xl" fontWeight="bold" mb={4}>
              Sanity Connection Diagnostics
            </Text>
            <Text color="gray.600" mb={4}>
              Comprehensive test of your Sanity.io connection
            </Text>
            <Button 
              onClick={runAllTests} 
              colorScheme="blue" 
              isLoading={loading}
            >
              Run Tests Again
            </Button>
          </Box>

          {results.map((result, index) => (
            <Box key={index} p={6} bg="white" borderRadius="lg" shadow="sm">
              <Text fontSize="lg" fontWeight="bold" mb={2}>
                {result.name}
              </Text>
              <Text 
                color={result.status === 'success' ? 'green.600' : result.status === 'error' ? 'red.600' : 'blue.600'}
                mb={2}
              >
                {result.message}
              </Text>
              {result.data && (
                <Box mt={3}>
                  <Text fontSize="sm" fontWeight="bold" mb={1}>
                    Response Data:
                  </Text>
                  <Code display="block" whiteSpace="pre" p={3} bg="gray.50" borderRadius="md" fontSize="xs" maxH="200px" overflow="auto">
                    {JSON.stringify(result.data, null, 2)}
                  </Code>
                </Box>
              )}
            </Box>
          ))}

          {/* Manual Test Instructions */}
          <Box p={6} bg="white" borderRadius="lg" shadow="sm">
            <Text fontSize="xl" fontWeight="bold" mb={4}>
              Manual Test Instructions
            </Text>
            <Text mb={4}>
              Open this URL directly in your browser to test the connection:
            </Text>
            <Code display="block" p={2} bg="gray.50" borderRadius="md" mb={4} fontSize="sm">
              https://7cl2mgrx.api.sanity.io/v2025-10-05/data/query/myblogcontent?query=*[]
            </Code>
            <Text mb={2}>
              You should see a JSON response with your blog posts.
            </Text>
            <Text mb={4}>
              If you see an error, the issue is with:
            </Text>
            <Text as="ul" pl={4}>
              <Text as="li">• CORS configuration in Sanity Manage</Text>
              <Text as="li">• Project/dataset doesn't exist</Text>
              <Text as="li">• Network firewall blocking the request</Text>
            </Text>
          </Box>

          {/* CORS Configuration Help */}
          <Alert status="warning">
            <AlertIcon />
            <Box>
              <Text fontWeight="bold">CORS Configuration Required</Text>
              <Text>Go to Sanity Manage → Project Settings → API → CORS Origins and add:</Text>
              <Code display="block" mt={2} p={2} bg="yellow.50">
                http://localhost:3000<br/>
                http://localhost:3001
              </Code>
              <Text mt={2}>Make sure to check "Allow credentials" and click "Save"</Text>
            </Box>
          </Alert>
        </VStack>
      </Container>
    </Box>
  )
}