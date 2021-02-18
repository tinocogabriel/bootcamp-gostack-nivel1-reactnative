import React, {useState, useEffect } from 'react';
import {SafeAreaView, View,FlatList, ScrollView, Text,StyleSheet,StatusBar,TouchableOpacity} from 'react-native';

import api from './services/api';

export default function App(){
    const [projects, setProjects] = useState([]);

    useEffect(()=>{
        api.get('projects').then(response=>{
            setProjects(response.data);
        })
    },[])

    async function handleAddProject(){
        const response = await api.post('projects',{
            title:`Projeto Tinoco ${Date.now()}`,
            owner:"Gabriel Tinoco"
        });

        const project = response.data;

        setProjects([...projects,project])
    }

    return (
    <>
        <StatusBar barStyle="light-content" />
        {/* <View style={styles.container}>
            {
                projects.map(project=>
                    <Text key={project.id} style={styles.title}>{project.title}</Text>
                )
            }
        </View> */}
        <SafeAreaView style={styles.container} >
            <FlatList data={projects}
                    keyExtractor={project=>project.id}
                    renderItem={({item : project})=>(
                            <Text style={styles.title}>{project.title}</Text>
                        )}/>
            <TouchableOpacity onPress={handleAddProject} activeOpacity={0.6} style={styles.button}>
                <Text style={styles.buttonText}>Adicionar Projeto</Text>
            </TouchableOpacity>
        </SafeAreaView>
    </>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: "#7159c1",
        // justifyContent:'center',
        // alignItems:'center'
    },
    title: {
        color:'#fff',
        fontSize:30,
        fontWeight:'bold'
    },
    button:{
        alignSelf:'stretch',
        backgroundColor:'#fff',
        margin:20,
        height:50,
        borderRadius:4,
         justifyContent:'center',
         alignItems:'center'
    },
    buttonText:{
        fontWeight:'bold',
        fontSize:10
    }
})