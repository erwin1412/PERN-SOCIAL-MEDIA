/* eslint-disable react/react-in-jsx-scope */

import { API } from "@/lib/api";
import { SearchIcon } from "@chakra-ui/icons";
import {
    Box,

    IconButton,

    Input,
    InputGroup,
    InputLeftElement,

  } from "@chakra-ui/react";
  import { useState } from "react";


  export function SearchPage() {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [searchResults, setSearchResults] = useState<any[]>([]);
  
    const handleSearch = async () => {
      try {
        if (searchQuery) {
          const response = await API.get(`/search-users?q=${searchQuery}`);
          setSearchResults(response.data);
        } else {
          setSearchResults([]); 
        }
      } catch (error) {
        setSearchResults([]); 
        console.error("Error searching users:", error);
      }
    };
  
    const handleKeyUp = () => {
      if (!searchQuery) {
        setSearchResults([]); 
      }
      handleSearch();
    };
  
    return (
      <Box>
        <Box mb={4}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <IconButton
                aria-label="Search"
                icon={<SearchIcon />}
                variant="outline"
              />
            </InputLeftElement>
            <Input
              type="text"
              placeholder="Search by username or fullname"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyUp={handleKeyUp} 
            />
          </InputGroup>
        </Box>
  
      {searchQuery === '' ? (
      <p>Please input a user</p>
    ) : searchResults.length === 0 ? (
        <p>User not found</p>
    ) : (
      <ul>
        {searchResults.map((user) => (
          <li key={user.id}>{user.username} - {user.fullname}</li>
        ))}
      </ul>
    )}
      </Box>
    );
  }
  
  
  