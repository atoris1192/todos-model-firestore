import { render, element } from "./view/html-util";
import { TodoListModel, collection } from './model/todoListModel'

export class App {
  private todoListModel: any;
  constructor() {
    this.todoListModel = new TodoListModel();
  }
  render() { // 追加されたら、描画が更新される
    const jsTodoList = document.querySelector('#js-todo-list');
    const ul = element`<ul />`

    // onSnapshot で内容更新を検知
    collection.orderBy('created_at', 'desc')
    .onSnapshot( snapshot => {
      snapshot.docChanges().forEach( change => {
        const item = change.doc.data();
        const id = change.doc.id
        if (change.type === 'added') {
          const li = item.isDone
             ? element`<li><input type="checkbox" class="checkbox" checked ><del>${ item.title }</del><button class="delete"> [x] </button></li>`
             : element`<li><input type="checkbox" class="checkbox" >${ item.title }<button class="delete"> [x] </button></li>`

             // checkBox state
             const checkbox = li.querySelector('.checkbox');
             checkbox.addEventListener('change', () => {
              console.log("checkbox change ", item.id, id );
              this.todoListModel.checkItem({ 
                id: id,
                isDone: !item.isDone,
              }) 
              this.render()
             })
          // const li = element`<li>${ item.title }</li>`

          // const li = document.createElement('li');
          // li.textContent = change.doc.data().title
          ul.appendChild(li);
        }
      })
    })

    render(ul, jsTodoList);
  }
    
  addTodo() {
    const jsForm = document.querySelector('#js-form');
    const jsFormInput: any = document.querySelector('#js-form-input');

    jsForm.addEventListener('submit', (event) =>{
      event.preventDefault();
      if(!jsFormInput.value.trim()) return

      this.todoListModel.addTodo({
        title: jsFormInput.value
      })

      jsFormInput.value = '';
    })
  }

  main() {
    
    // this.todoListModel.test01() 
    // this.test02()
    // this.test03()
    // this.test04();
    // this.todoListModel.test05();
    

    this.addTodo();
    this.render()

  }
}