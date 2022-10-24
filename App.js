import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, FlatList, Image, View } from 'react-native';
import axios from 'axios';
import { useEffect, useState } from 'react';

 function App() {
  const [data, setData] = useState('')
  const [images, setImages] = useState([])
  const random = (array) => {
    var copy = array.slice(0);
      return function() {
        if (copy.length < 1) { copy = array.slice(0) }
        var index = Math.floor(Math.random() * copy.length)
        var item = copy[index]
        copy.splice(index, 1)
        return item
      };
    }


  useEffect(()=>{
    var i = 0
    while(i<12){
      axios.get('https://dog.ceo/api/breeds/image/random')
      .then(response=>{
        images.unshift(response.data.message)
        console.log(images)
        setData(random(images))

    })
      .catch((e) =>{
        console.log(e)
      })
      var i = i + 1
  
    }

  }, [])

      return (

    <View style={styles.container}>
      <FlatList 
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={() => (
            <><Image
              source={images[Math.floor(Math.random() * images.length)]}
              style={{
                width: 260,
                height: 300,
                borderWidth: 2,
                borderColor: '#d35647',
                resizeMode: 'contain',
                margin: 8
              }} /></>
      )}
  /> 
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default App;