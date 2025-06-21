import { useEffect, useState } from "react";
import { User } from "../../../../types/User";
import { throttle } from "lodash";
import { searchService } from "../../../../features/search/services/api/searchService";
import FormAutocomplete from "../../../../features/form/components/FormAutocomplete";
import FormChip from "../../../../features/form/components/FormChip";
import { Avatar, Box, MenuItem } from "@mui/material";
import { ListItem } from "../../../../components/ListItem";


export default function UserInput({
    title,
    placeholder,
    value,
    onChange
}: {
    title?: string,
    placeholder?: string,
    value: User[],
    onChange: Function
}) {
    const [search, setSearch] = useState("");

    const [users, setUsers] = useState<User[]>([]);
    
    const [isLoading, setIsLoading] = useState(false);

    const fetchUsers = throttle(async (searchTerm: string) => {
        if (searchTerm === "") {
            setUsers([]);
            setIsLoading(false);
            return;
        }
        
        setIsLoading(true);
        try {
            const {data} = await searchService.search(searchTerm, "user", new Map([]));
            setUsers(data);
        } catch (error) {
            console.error("Search failed:", error);
        } finally {
            setIsLoading(false);
        }
    }, 500)

    useEffect(() => {
        fetchUsers(search);
        
        return () => {fetchUsers.cancel()}
    }, [search])

    return (
        <FormAutocomplete 
            multiple
            freeSolo
            title={title}
            placeholder={placeholder}
            options={users}
            loading={isLoading}
            getOptionLabel={(option) => typeof option == "string" ? option : option?.login}
            getOptionKey={(option) => typeof option == "string" ? option : option?.id}
            onChange={(_event, value) => {
                onChange?.(value);
            }}
            onInputChange={(_, newInputValue) => {
                setSearch(newInputValue);
            }}
            value={value || []}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderOption={({key, ...props}, option, _state, _ownerState) => (
                <MenuItem
                    key={key}
                    sx={{
                        px: "15px"
                    }}
                    {...props}
                >
                    <ListItem 
                        img={option.avatar}
                        title={option.login}
                        subtitle={option.about}
                    />
                </MenuItem>
            )}
            renderTags={(value) => (
                <Box
                    sx={{
                        pl: "10px",
                        display: "flex",
                        flexDirection: "row",
                        gap: "5px",
                        flexWrap: "wrap"
                    }}
                >
                    {value.map(user => (
                        <FormChip 
                            sx={{
                                height: "32px",
                                "& .MuiChip-label": {
                                    paddingLeft: "10px",
                                    paddingRight: "8px"
                                },
                            }}
                            key={user.id}
                            avatar={<Avatar src={user.avatar} />}
                            label={user.login}
                            onDelete={() => {
                                onChange?.(value.filter(val => val.id != user.id))
                            }}
                        />
                    ))}    
                </Box>
            )}
        />
    )
}