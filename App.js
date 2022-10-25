import { setStatusBarBackgroundColor, StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, FlatList, Image, View } from 'react-native';
import axios from 'axios';
import { useState } from 'react';

// Não achei preciso usar o useEffect pois ele ficaria chamando a api toda vez que ocorresse
// uma mudança de estado no componente.
 function App() {
  const [imagesDog, setImagesDog] = useState([]) // lista onde irá guardar todos os endereços das imagens
  const [load, setLoad] = useState(false) //estado para definir se a api terminou de carregar


  if(!load){ // A Api so irá carregar uma vez que será a primeira quando o load tiver falso (evitar que carregue  denovo caso o componente renderize)

    for(let i = 0; i < 12; i++){ // for para pegar 12 imagens

      axios.get('https://dog.ceo/api/breeds/image/random')
      .then(response => {
          imagesDog.push(response.data.message)
          console.log(imagesDog)
          if(imagesDog.length == 12) setLoad(true) //quando tiver 12 imagens no array ele vai colocar o load como true, assim parando a api e carregando a página
      })
      
      .catch((e) =>{
        console.log(e)
      })
  
    }
  }


return (
  load ? // A pagina principal so irá carregar quanto a api terminar de trabalhar

  <View style={styles.container}>
  <FlatList
    horizontal // O horizontal ta botando umas imagens fora da tela, depois tu vê oq é ai
    style={{width:'100%', marginTop:'20%'}}
    showsHorizontalScrollIndicator={false}
    data = {imagesDog} // data é array que o flatList utilizará
    renderItem={({ item }) => ( //funcão do flatlist que percorre cada item que colocamos no data, o parâmetro item é equivalente a cada item do array.
        <Image
          source={{uri: item}}
          style={{
            width: 260,
            height: 300,
            borderWidth: 2,
            borderColor: '#d35647',
            resizeMode: 'contain',
            margin: 8
          }} 
        />
  )}
  />
    <FlatList
    horizontal // O horizontal ta botando umas imagens fora da tela, depois tu vê oq é ai
    style={{width:'100%', marginTop:'20%'}}
    showsHorizontalScrollIndicator={false}
    data = {imagesDog} // data é array que o flatList utilizará
    renderItem={({ item }) => ( //funcão do flatlist que percorre cada item que colocamos no data, o parâmetro item é equivalente a cada item do array.
        <Image
          source={{uri: item}}
          style={{
            width: 260,
            height: 300,
            borderWidth: 2,
            borderColor: '#d35647',
            resizeMode: 'contain',
            margin: 8
          }} 
        />
  )}
  />
   
  <StatusBar style="auto" />
  </View>
  
  : // enquanto a api trabalha ele retorna uma tela de loading

  <View style={styles.loadPage}>
    <Text style={styles.loadFont}>Loading...</Text>
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

  loadPage:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },

  loadFont:{
    fontWeight: 'bold',
    fontSize: 30,
    color: 'white'
  }
});

export default App;