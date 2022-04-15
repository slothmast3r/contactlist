import {useEffect, useState} from "react";
import "./ContactList.scss";
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import CheckIcon from '@mui/icons-material/Check';
import * as PropTypes from "prop-types";

function ContactItem(props) {
    return <ListItem className="contact-row" onClick={props.onClick}>
        <ListItemAvatar>
            {props.listOfToggledContacts.find(props.predicate) ?
                <Avatar><CheckIcon></CheckIcon></Avatar> : (props.item.avatar ? <Avatar src={props.item.avatar}/> :
                    <Avatar>{`${props.item.first_name.substring(0, 1)}${props.item.last_name.substring(0, 1)}`}</Avatar>)}
        </ListItemAvatar>
        <ListItemText primary={`${props.item.first_name} ${props.item.last_name}`} secondary={props.item.email}/>
    </ListItem>;
}

ContactItem.propTypes = {
    onClick: PropTypes.func,
    listOfToggledContacts: PropTypes.arrayOf(PropTypes.any),
    predicate: PropTypes.func,
    item: PropTypes.any
};
export default function ContactList() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState([]);
    const [listOfToggledContacts, setListOfToggledContacts] = useState([])
    const [searchContact, setSearchContact] = useState('')
    useEffect(function () {
        fetch(process.env.REACT_APP_CONTACT_LIST_URL)
            .then((response) => response.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setData(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
    }, []);

    function toggleContact(contact){
        let arr = listOfToggledContacts
        const index = arr.indexOf(contact.id);
        if (index > -1) {
            arr.splice(index, 1); // 2nd parameter means remove one item only
        }
        else{
            arr.push(contact.id)
        }
        console.log('Toggled Id: ',arr)
        setListOfToggledContacts([...arr])
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div>
                <div className="contact-header">Contacts</div>
                <TextField
                    type="text"
                    value={searchContact}
                    fullWidth
                    label="Search contacts"
                    variant="filled"
                    onChange={(input) => setSearchContact(input.target.value)}
                    InputProps={{
                        startAdornment: (<SearchIcon></SearchIcon>)
                    }}
                />
                <List>
                    {data.filter((contact) => {
                        let contactName = `${contact.first_name} ${contact.last_name}`.toLowerCase()
                        return contactName.includes(searchContact.toLowerCase())
                    }).map((item) => (
                        <ContactItem key={item.id} onClick={() => toggleContact(item)}
                                     listOfToggledContacts={listOfToggledContacts} predicate={x => x == item.id}
                                     item={item}/>

                    ))}
                </List>
            </div>
        );
    }
}
