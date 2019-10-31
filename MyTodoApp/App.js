import React from 'react';
import { StyleSheet, Text, View, FlatList, AsyncStorage } from 'react-native';
import Header from './app/components/Header';
import Subtitle from './app/components/Subtitle';
import Input from './app/components/Input';
import Listitem from './app/components/Listitem';

// expo.github.io/vector-icons/ 에서 무슨 아이콘 쓸 수 있는지 볼 수 있음.
// state라는 애로 데이터의 삭제 추가를 다뤄볼꺼에요. 그러려면 펑션을 클래스로 바꿔야됩니다.
//export default function App() {
export default class App extends React.Component {
  // 그냥 생성자임 ㅇㅇ 초기변수설정
  constructor(props){
    super(props);
    this.state = {inputValue:'', todos:[]}
  }
  // 내장 함수인듯
  componentWillMount(){
    this.getData()
  }
  // @todo 라는 앱에 state라는 변수를 저장하겠어요 (관습적으로 이렇게 써준다.)
  storeData=()=>{
    AsyncStorage.setItem('@todo:state', JSON.stringify(this.state));
  }

  getData=()=>{
    AsyncStorage.getItem('@todo:state').then((state)=>{
      if(state !== null){
        this.setState(JSON.parse(state));
      }
    })
  }

  // 와우 = 엄격하게 붙여줘야된다..
  _makeTodoItem=({item, index})=>{
    return (
      <Listitem name = {item.title} 
      isComplete = {item.iscomplete}
      isStar = {item.isstar} 
      changeComplete={()=>{
        const newTodo = [...this.state.todos]
        newTodo[index].iscomplete = !newTodo[index].iscomplete
        this.setState({todos: newTodo}, this.storeData)
      }} 
      changeStar={()=>{
        const newTodo = [...this.state.todos]
        newTodo[index].isstar = !newTodo[index].isstar
        this.setState({todos: newTodo}, this.storeData)
      }}
      deleteItem={()=>{
        const newTodo = [...this.state.todos]
        newTodo.splice(index, 1) // index위치부터 1개 지워라
        this.setState({todos: newTodo}, this.storeData)
      }}/>
    );
  }
  _changeText=(value)=>{
    this.setState({inputValue:value});
  }
  _addTodoItem=()=>{
    if(this.state.inputValue !== ""){
      const prevTodo = this.state.todos;

      const newTodo = {title : this.state.inputValue, iscomplete: false, isstar: false};

      this.setState({ 
        inputValue: '',
        todos : prevTodo.concat(newTodo),        
      }, this.storeData);
    }
  }
  render(){
  return (
    <View style={styles.container}>
      <View style={styles.headercenter}>
        <Header/>
      </View>
      <View style={styles.subtitleposi}>
        <Subtitle title="해야 할 일"/>
        <Input value = {this.state.inputValue} changeText = {this._changeText} addTodoItem = {this._addTodoItem} style={styles.inputposi}/>
      </View>         
      <View style={styles.subtitleposi}>
        <Subtitle title="해야 할 일 목록"/>
        

        <FlatList data={this.state.todos} renderItem = {this._makeTodoItem} keyExtractor ={(item, index)=>{return `$(index)`}}/>
      </View>    
    </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center', 가로 정렬
    //justifyContent: 'center', 세로 정렬
  },
  headercenter: {
    alignItems: "center",
    
  },
  subtitleposi: {
    marginLeft: 50,
  },
  inputposi: {
    marginBottom: 20,
  }
});
