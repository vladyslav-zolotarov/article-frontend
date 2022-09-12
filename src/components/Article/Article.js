import { useState } from 'react';

import { format } from 'date-fns';

import './Article.scss';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityIcon from '@mui/icons-material/Visibility';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Stack from '@mui/material/Stack';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Skeleton from '@mui/material/Skeleton';
import { createTheme } from '@mui/material/styles';


const Article = (props, key) => {
    const { isLoaded } = props;
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const options = [
        'Edit',
        'Remove',
    ];

    const theme = createTheme({
        palette: {
            primary: {
                light: '#757ce8',
                main: '#3f50b5',
                dark: '#002884',
                contrastText: '#fff',
            },
            secondary: {
                light: '#ff7961',
                main: '#f44336',
                dark: '#ba000d',
                contrastText: '#000',
            },
        },
    });

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (option) => {
        console.log(option);
        setAnchorEl(null);
    };


    return (
        <ListItem theme={theme} key={key}>
            <Card sx={{ width: 545 }}>
                <CardHeader
                    avatar={!isLoaded ? (
                        <Skeleton animation="wave" variant="circular" width={40} height={40} />
                    ) : (<Avatar sx={{ bgcolor: theme.palette.primary.main }} aria-label="recipe">V</Avatar>)}
                    action={!isLoaded ? null : (<>
                            <IconButton
                                aria-label="more"
                                id="long-button"
                                aria-controls={open ? 'long-menu' : undefined}
                                aria-expanded={open ? 'true' : undefined}
                                aria-haspopup="true"
                                onClick={handleClick}>
                                <MoreVertIcon />
                            </IconButton>
                            <Menu
                                id="long-menu"
                                MenuListProps={{
                                    'aria-labelledby': 'long-button',
                                }}
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                            >
                                {options.map((option) => (
                                    <MenuItem key={option} onClick={() => handleClose(option)}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </Menu>
                    </>)
                    }
                    title={!isLoaded ? (<Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }}/>
                    ) : props?.item?.user.fullName}

                    subheader={!isLoaded ? (<Skeleton animation="wave" height={10} width="50%" style={{ marginBottom: 6 }}/>
                    ) : (format(new Date(props?.item?.createdAt), 'MMMM dd, yyyy'))}
                />
                {!isLoaded ? (
                    <Skeleton sx={{ height: 300 }} animation="wave" variant="rectangular" />
                ): (<CardMedia
                    component="img"
                    height="300"
                    image={props?.item?.imgUrl}
                    alt="img"
                />)}
                
                <CardContent>
                    {!isLoaded ? <Skeleton height={40} width="100%" animation="wave" /> : (
                        <Typography gutterBottom variant="h5" component="div">
                            {props?.item?.title}
                        </Typography>
                    )}
                    {!isLoaded ? <Skeleton height={100} width="100%" animation="wave" /> : (
                        <Typography variant="body2" color="text.secondary">
                            {props?.item?.text}
                        </Typography>
                    )}
                    {!isLoaded ? <Skeleton height={20} width="100%" animation="wave" /> : (
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Typography sx={{ display: 'flex', alignItems: 'center' }} variant="body1" color="text.secondary">
                            <VisibilityIcon sx={{ mr: .5, mb: 0.25 }} fontSize="small" /><span>{props?.item?.viewsCount}</span>
                        </Typography>
                        <List sx={{ display: 'flex', wrap: 'wrap', align: 'center', padding: 0 }}>
                            {props?.item?.tags.map((item, key) => {
                                return <ListItem sx={{ bgcolor: theme.palette.primary.main, color: theme.palette.primary.contrastText, borderRadius: .5, pt: .5, pb: .5, pl: 1, pr: 1, m: .5 }} key={key}>#{item}</ListItem>
                            })}
                        </List>
                    </Stack>
                    )}
                </CardContent>
            </Card>
        </ListItem>)
}

export default Article;