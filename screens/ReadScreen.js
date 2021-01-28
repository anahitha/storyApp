import React from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import {ListItem} from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';
import MyHeader from '../components/header';

export default class DonateScreen extends React.Component {
    constructor(){
        super();
        this.state = {
            storyList: []
        }
        this.storyref = null;
    }
    getStories = ()=>{
        this.storyref = db.collection("stories").onSnapshot((snapshot)=>{
            var storyList = snapshot.docs.map((doc)=>doc.data())    
            this.setState({
                storyList: storyList
            })
        })
    }
    componentDidMount(){
        this.getStories();
    }
    componentWillUnmount(){
        this.storyref = null;
    }
    keyExtractor = (item, index)=>index.toString();
    renderItem= ({item, I})=>{
        return(
            <ListItem key = {I} title = {item.title} subtitle = {item.author} 
            titleStyle = {{color: 'black', fontWeight: 'bold'}} 
            rightElement = {<TouchableOpacity style = {styles.button} onPress = {()=>{
                this.props.navigation.navigate("StoryScreen",{"details": item})
            }}>
                                <Text style = {styles.buttonText}>Read</Text>
                            </TouchableOpacity>}
            bottomDivider/>
        )                                                                     
    }
        render(){
        return(
            <View style = {{flex: 1}}>
                <MyHeader title = "Stories"></MyHeader>
                <View style = {{flex: 1}}>
                    {this.state.storyList.length == 0?(
                        <View style = {{flex: 1}}>
                            <Text style = {{fontSize: 20}}>Stories should come here</Text>
                        </View>
                    ):(
                        <FlatList keyExtractor = {this.keyExtractor} 
                        data = {this.state.storyList}
                        renderItem = {this.renderItem}></FlatList>
                    )}
                </View>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    keyView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }, 
    button: {
        width: 300,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ff9800',
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 8},
        shadowOpacity: 0.30,
        shadowRadius: 10.32,
        elevation: 16,
        marginTop: 20
    },
    input: {
        width: '75%',
        height: 30,
        borderBottomWidth: 1.5,
        borderColor: '#ff8a65',
        fontSize: 12,
        marginTop: 20,
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        alignSelf: 'center'
    },
    buttonText:{
        color: 'black',
        fontSize: 20
    }
})