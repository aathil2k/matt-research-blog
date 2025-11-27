 

"use client";

import { useEffect, useState } from "react";
import { sanityClient, urlFor } from "../../sanity/client";

import {
  Box,
  Button,
  Textarea,
  VStack,
  Text,
  Heading,
  Spinner,
  useToast,
  Divider,
  Input,
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
  Flex,
  IconButton,
  HStack,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Container,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FaTrash, FaBlog, FaPlus, FaChartBar, FaEye, FaEdit } from "react-icons/fa";

// AI Functions
import {
  generateBlogSuggestions,
  generateFullBlog,
} from "../../lib/aiGenerator";

// JWT Decode helper
import { getUserFromToken } from "../../utils/auth";

export default function AdminPage() {
  const toast = useToast();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Authentication states
  const [user, setUser] = useState<any>(null);
  const [showLoginModal, setShowLoginModal] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<string | null>(null);

  // AI generator states
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<{
    title: string;
    content: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  // Blog list states
  const [blogs, setBlogs] = useState<any[]>([]);
  const [showBlogGenerator, setShowBlogGenerator] = useState(false);
  const [deletingBlogId, setDeletingBlogId] = useState<string | null>(null);

  // ------------------ CHECK LOGIN ------------------
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const userData = getUserFromToken();

    if (token && userData && userData.role === "ADMIN") {
      setUser(userData);
      setRole(userData.role);
      setIsAuthenticated(true);
      setShowLoginModal(false);
      fetchBlogs();
    } else {
      setShowLoginModal(true);
    }
  }, []);

  // ------------------ LOGIN FUNCTION ------------------
  const handleLogin = async (e: any) => {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      toast({ title: data.error, status: "error" });
      return;
    }

    sessionStorage.setItem("token", data.token);

    const userData = getUserFromToken();
    
    if (userData.role !== "ADMIN") {
      toast({ title: "Access denied. Admin role required.", status: "error" });
      sessionStorage.removeItem("token");
      return;
    }

    setUser(userData);
    setRole(userData.role);
    setIsAuthenticated(true);
    setShowLoginModal(false);

    toast({ title: "Admin Login Successful!", status: "success" });
    fetchBlogs();
  };

  // ------------------ LOGOUT ------------------
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
    setShowLoginModal(true);
    setRole(null);
    setBlogs([]);

    toast({ title: "Logged out", status: "info" });
  };

  // ------------------ FETCH BLOGS ------------------
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const query = `*[_type == "post"]{
              _id, title, slug, mainImage, body, _createdAt
            } | order(_createdAt desc)`;
            const data = await sanityClient.fetch(query);
      
      
        setBlogs(data);
      
    } catch (error) {
      console.error("Error fetching blogs:", error);
      toast({
        title: "Failed to load blogs",
        status: "error",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  // ------------------ DELETE BLOG ------------------
  const   handleDeleteBlog = async (blogId: string, blogTitle: string) => {
    setDeletingBlogId(blogId);
    
    try {
      const response = await fetch(`/api/delete?id=${blogId}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Failed to delete blog');
      }

      toast({
        title: "Blog deleted",
        description: `${blogTitle} has been deleted successfully.`,
        status: "success",
        duration: 3000,
      });

      // Refresh blog list
      fetchBlogs();
      onClose();
    } catch (error) {
      toast({
        title: "Delete failed",
        description: "Failed to delete the blog. Please try again.",
        status: "error",
        duration: 3000,
      });
    } finally {
      setDeletingBlogId(null);
    }
  };

  // ------------------ AI HANDLERS ------------------
  const handleGenerate = async () => {
    if (!query) {
      toast({
        title: "Please enter a topic",
        status: "warning",
        duration: 3000,
      });
      return;
    }
    
    setLoading(true);
    try {
      const result = await generateBlogSuggestions(query);
      setSuggestions(result);
    } catch (error) {
      toast({
        title: "Failed to generate suggestions",
        status: "error",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = async (title: string) => {
    setLoading(true);
    try {
      const content = await generateFullBlog(title);
      setSelectedBlog({ title, content });
    } catch (error) {
      toast({
        title: "Failed to generate blog content",
        status: "error",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async () => {
    if (!selectedBlog) return;
    setLoading(true);

    try {
      const response = await fetch("/api/publish-blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedBlog),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      toast({ 
        title: "Blog Published Successfully!", 
        status: "success",
        duration: 3000,
      });
      
      setSelectedBlog(null);
      setQuery("");
      setSuggestions([]);
      setShowBlogGenerator(false);
      
      // Refresh blog list
      fetchBlogs();
    } catch (err) {
      toast({ 
        title: "Error publishing blog", 
        status: "error",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  // ------------------ LOGIN MODAL ------------------
  if (showLoginModal) {
    return (
      <Box
        position="fixed"
        top={0}
        left={0}
        w="100vw"
        h="100vh"
        bg="blackAlpha.600"
        display="flex"
        alignItems="center"
        justifyContent="center"
        zIndex={999}
      >
        <Box
          bg="white"
          p={8}
          rounded="xl"
          shadow="2xl"
          w="400px"
        >
          <VStack spacing={4}>
            <Heading size="lg" color="blue.600" textAlign="center">
              Admin Dashboard
            </Heading>
            <Text color="gray.600" textAlign="center">
              Please login to access the admin panel
            </Text>
            
            <Divider />
            
            <form onSubmit={handleLogin} style={{ width: '100%' }}>
              <VStack spacing={4}>
                <Input
                  placeholder="Email Address"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  size="lg"
                />

                <Input
                  placeholder="Password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  size="lg"
                />

                <Button
                  type="submit"
                  width="full"
                  colorScheme="blue"
                  size="lg"
                >
                  Sign In
                </Button>
              </VStack>
            </form>
          </VStack>
        </Box>
      </Box>
    );
  }

  // ------------------ DASHBOARD CONTENT ------------------
  return (
    <Box minH="100vh" bg="gray.50">
      <Container maxW="container.xl" py={8}>
        {/* Header */}
        <Card mb={8} shadow="lg">
          <CardBody>
            <Flex justify="space-between" align="center">
              <VStack align="start" spacing={2}>
                <Heading size="xl" color="blue.600">
                  Admin Dashboard
                </Heading>
                <Text color="gray.600" fontSize="lg">
                
                  <Badge ml={2} colorScheme="blue" fontSize="sm">
                    {role}
                  </Badge>
                </Text>
              </VStack>
              
              <Button 
                colorScheme="red" 
                size="lg"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Flex>
          </CardBody>
        </Card>

        {/* Stats Cards */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={8}>
          <Card shadow="md" _hover={{ shadow: "lg", transform: "translateY(-2px)" }} transition="all 0.3s">
            <CardBody>
              <Stat textAlign="center">
                <StatLabel fontSize="lg" color="gray.600">Total Blogs</StatLabel>
                <StatNumber fontSize="4xl" color="blue.600">{blogs.length}</StatNumber>
                <StatHelpText>Published Articles</StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card shadow="md" _hover={{ shadow: "lg", transform: "translateY(-2px)" }} transition="all 0.3s">
            <CardBody>
              <Stat textAlign="center">
                <StatLabel fontSize="lg" color="gray.600">Recent Activity</StatLabel>
                <StatNumber fontSize="4xl" color="green.600">{blogs.slice(0, 5).length}</StatNumber>
                <StatHelpText>Last 5 Blogs</StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card shadow="md" _hover={{ shadow: "lg", transform: "translateY(-2px)" }} transition="all 0.3s">
            <CardBody>
              <VStack spacing={4} justify="center" h="100%">
                <Button
                  leftIcon={showBlogGenerator ? <FaEye /> : <FaPlus />}
                  colorScheme="blue"
                  size="lg"
                  width="full"
                  onClick={() => setShowBlogGenerator(!showBlogGenerator)}
                >
                  {showBlogGenerator ? "View Dashboard" : "Generate New Blog"}
                </Button>
              </VStack>
            </CardBody>
          </Card>
        </SimpleGrid>

        {/* Blog Generator Section */}
        {showBlogGenerator && (
          <Card mb={8} shadow="lg">
            <CardHeader bg="blue.50" borderTopRadius="lg">
              <Heading size="lg" color="blue.700">
                <FaBlog style={{ display: 'inline', marginRight: '12px' }} />
                AI Blog Generator
              </Heading>
            </CardHeader>
            <CardBody>
              <VStack spacing={6} align="stretch">
                <Box>
                  <Text mb={2} fontWeight="medium" color="gray.700">
                    Enter Blog Topic
                  </Text>
                  <Textarea
                    placeholder="Describe what you want to write about..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    rows={3}
                    size="lg"
                  />
                </Box>

                <Button
                  colorScheme="blue"
                  onClick={handleGenerate}
                  isLoading={loading}
                  leftIcon={<FaPlus />}
                  size="lg"
                >
                  Generate Suggestions
                </Button>

                {suggestions.length > 0 && (
                  <Card variant="outline">
                    <CardHeader bg="gray.50">
                      <Heading size="md">Blog Suggestions</Heading>
                    </CardHeader>
                    <CardBody>
                      <VStack spacing={3} align="stretch">
                        {suggestions.map((s, i) => (
                          <Box
                            key={i}
                            p={4}
                            border="1px solid"
                            borderColor="gray.200"
                            borderRadius="md"
                            cursor="pointer"
                            _hover={{ bg: "blue.50", borderColor: "blue.200" }}
                            onClick={() => handlePreview(s)}
                          >
                            <Text fontWeight="medium">{s}</Text>
                          </Box>
                        ))}
                      </VStack>
                    </CardBody>
                  </Card>
                )}

                {selectedBlog && (
                  <Card variant="outline">
                    <CardHeader bg="green.50">
                      <Heading size="md">Blog Preview: {selectedBlog.title}</Heading>
                    </CardHeader>
                    <CardBody>
                      <Textarea 
                        value={selectedBlog.content} 
                        readOnly 
                        rows={12} 
                        size="lg"
                      />
                      <Button
                        mt={4}
                        colorScheme="green"
                        onClick={handlePublish}
                        isLoading={loading}
                        width="full"
                        size="lg"
                        leftIcon={<FaBlog />}
                      >
                        Publish Blog
                      </Button>
                    </CardBody>
                  </Card>
                )}
              </VStack>
            </CardBody>
          </Card>
        )}

        {/* Blog List Section */}
        <Card shadow="lg">
          <CardHeader bg="white" borderTopRadius="lg">
            <Flex justify="space-between" align="center">
              <Heading size="lg">
                All Blogs ({blogs.length})
              </Heading>
              <Button
                colorScheme="blue"
                variant="outline"
                onClick={fetchBlogs}
                isLoading={loading}
              >
                Refresh
              </Button>
            </Flex>
          </CardHeader>
          <CardBody>
            {loading ? (
              <Flex justify="center" align="center" py={12}>
                <Spinner size="xl" color="blue.500" />
              </Flex>
            ) : blogs.length === 0 ? (
              <Box textAlign="center" py={12}>
                <Text fontSize="xl" color="gray.500" mb={4}>
                  No blogs published yet.
                </Text>
                <Button
                  colorScheme="blue"
                  onClick={() => setShowBlogGenerator(true)}
                  leftIcon={<FaPlus />}
                >
                  Create Your First Blog
                </Button>
              </Box>
            ) : (
              <Box overflowX="auto">
                <Table variant="simple">
                  <Thead bg="gray.50">
                    <Tr>
                      <Th>Title</Th>
                      <Th>Created Date</Th>
                      <Th>Status</Th>
                      <Th width="120px">Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {blogs.map((blog) => (
                      <Tr key={blog._id} _hover={{ bg: "gray.50" }}>
                        <Td>
                          <VStack align="start" spacing={1}>
                            <Text fontWeight="medium" noOfLines={1}>
                              {blog.title}
                            </Text>
                            <Text fontSize="sm" color="gray.600" noOfLines={2}>
                              {blog.body?.[0]?.children?.[0]?.text || "No content preview"}
                            </Text>
                          </VStack>
                        </Td>
                        <Td>
                          <Text fontSize="sm">
                            {new Date(blog._createdAt).toLocaleDateString()}
                          </Text>
                          <Text fontSize="xs" color="gray.500">
                            {new Date(blog._createdAt).toLocaleTimeString()}
                          </Text>
                        </Td>
                        <Td>
                          <Badge colorScheme="green" fontSize="sm">
                            Published
                          </Badge>
                        </Td>
                        <Td>
                          <HStack spacing={2}>
                            <IconButton
                              aria-label="View blog"
                              icon={<FaEye />}
                              size="sm"
                              colorScheme="blue"
                              variant="outline"
                              onClick={() => window.open(`/blog/${blog.slug?.current}`, '_blank')}
                            />
                            <IconButton
                              aria-label="Delete blog"
                              icon={<FaTrash />}
                              size="sm"
                              colorScheme="red"
                              isLoading={deletingBlogId === blog._id}
                              onClick={() => {
                                setDeletingBlogId(blog._id);
                                onOpen();
                              }}
                            />
                          </HStack>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            )}
          </CardBody>
        </Card>
      </Container>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Delete</ModalHeader>
          <ModalBody>
            <Text>
              Are you sure you want to delete this blog? This action cannot be undone.
            </Text>
            {deletingBlogId && (
              <Text mt={2} fontWeight="medium" color="red.600">
                Blog: {blogs.find(b => b._id === deletingBlogId)?.title}
              </Text>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={() => {
                if (deletingBlogId) {
                  const blog = blogs.find(b => b._id === deletingBlogId);
                  if (blog) {
                     
                    handleDeleteBlog(blog._id, blog.title);
                  }
                }
              }}
 
              >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}