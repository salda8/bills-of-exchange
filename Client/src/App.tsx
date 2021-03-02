import React from 'react';
import {createStyles, Theme, makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {Switch, Route, Link} from 'react-router-dom';
import Osoby from "./components/pages/Osoby";
import Smenky from "./components/pages/Smenky";
import OsobaDetail from "./components/pages/OsobaDetail";
import SmenkaDetail from "./components/pages/SmenkaDetail";
import {useLocation} from "react-router-dom";
import {Description, Person} from "@material-ui/icons";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        appBar: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        // necessary for content to be below app bar
        toolbar: theme.mixins.toolbar,
        content: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.default,
            padding: theme.spacing(3),
        },
    }),
);

export default function PermanentDrawerLeft() {
    const classes = useStyles();
    const {pathname} = useLocation();

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        {(pathname === '/' || pathname === '/osoby') && 'Osoby'}
                        {pathname === '/smenky' && 'Směnky'}
                        {pathname.startsWith('/osoby/') && 'Osoba'}
                        {pathname.startsWith('/smenky/') && 'Směnka'}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <div className={classes.toolbar}/>
                <Divider/>
                <List>
                    <ListItem button key={'Osoby'} component={Link} to='/'>
                        <ListItemIcon> <Person/> </ListItemIcon>
                        <ListItemText primary={'Osoby'}/>
                    </ListItem>
                    <ListItem button key={'Směnky'} component={Link} to='/smenky'>
                        <ListItemIcon> <Description/> </ListItemIcon>
                        <ListItemText primary={'Směnky'}/>
                    </ListItem>
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar}/>
                <Switch>
                    <Route exact path="/" component={Osoby}/>
                    <Route exact path="/osoby" component={Osoby}/>
                    <Route exact path="/smenky" component={Smenky}/>
                    <Route exact path="/osoby/:id" component={OsobaDetail}/>
                    <Route exact path="/smenky/:id" component={SmenkaDetail}/>
                </Switch>
            </main>
        </div>
    );
}
