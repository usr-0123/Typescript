interface Todo {
    id: number;
    text: string;
}

interface NewTodo {
    text: string;
}

class TodoApp {
    private todos: Todo[] = [];
    private viewTodosBtn: HTMLButtonElement;
    private createTodoBtn: HTMLButtonElement;
    private viewTodosPage: HTMLElement;
    private createTodoPage: HTMLElement;
    private todoList: HTMLUListElement;
    private todoForm: HTMLFormElement;
    private todoInput: HTMLInputElement;

    url = 'http://localhost:3000/'

    constructor() {
        this.viewTodosBtn = document.getElementById('viewTodosBtn') as HTMLButtonElement;
        this.createTodoBtn = document.getElementById('createTodoBtn') as HTMLButtonElement;
        this.viewTodosPage = document.getElementById('viewTodosPage') as HTMLElement;
        this.createTodoPage = document.getElementById('createTodoPage') as HTMLElement;
        this.todoList = document.getElementById('todoList') as HTMLUListElement;
        this.todoForm = document.getElementById('todoForm') as HTMLFormElement;
        this.todoInput = document.getElementById('todoInput') as HTMLInputElement;

        this.viewTodosBtn.addEventListener('click', () => this.showPage('view'));
        this.createTodoBtn.addEventListener('click', () => this.showPage('create'));
        this.todoForm.addEventListener('submit', (e) => this.addTodoHandler(e));

        this.loadTodos();
    }

    private showPage(page: string): void {
        if (page === 'view') {
            this.viewTodosBtn.classList.add('active');
            this.createTodoBtn.classList.remove('active');
            this.viewTodosPage.classList.add('active');
            this.createTodoPage.classList.remove('active');
        } else {
            this.createTodoBtn.classList.add('active');
            this.viewTodosBtn.classList.remove('active');
            this.createTodoPage.classList.add('active');
            this.viewTodosPage.classList.remove('active');
        }
    }

    private async addTodoHandler(event: Event): Promise<void> {
        event.preventDefault();
        const todoText = this.todoInput.value.trim();
        if (todoText) {
            await this.createTodo(todoText);
            this.todoInput.value = '';
            await this.loadTodos();
        }
    }

    private async createTodo(text: string): Promise<void> {
        const newTodo: NewTodo = { text: text };
        await fetch(this.url + 'todos', {
            method: 'POST',
            body: JSON.stringify(newTodo)
        });
    }

    private async loadTodos(): Promise<void> {
        const response = await fetch(this.url + 'todos');
        const todos = await response.json();
        this.todos = todos;
        this.renderTodos();
    }

    private renderTodos(): void {
        this.todoList.innerHTML = '';
        this.todos.forEach((todo) => {
            const li = document.createElement('li');
            li.textContent = todo.text;
            li.dataset.id = todo.id.toString();

            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.addEventListener('click', () => this.editTodoHandler(todo.id));

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', () => this.deleteTodoHandler(todo.id));

            li.appendChild(editBtn);
            li.appendChild(deleteBtn);
            this.todoList.appendChild(li);
        });
    }

    private async editTodoHandler(id: number): Promise<void> {
        const newText = prompt('Edit your todo');
        if (newText !== null) {
            await this.editTodo(id, newText);
            await this.loadTodos();
        }
    }

    private async editTodo(id: number, newText: string): Promise<void> {
        const todo = this.todos.find((t) => t.id === id);
        if (todo) {
            todo.text = newText;
            
            await fetch(this.url + 'todos/' + id, {
                method: 'PUT',
                body: JSON.stringify(todo)
            });
        }
    }

    private async deleteTodoHandler(id: number): Promise<void> {
        await this.deleteTodo(id);
        await this.loadTodos();
    }

    private async deleteTodo(id: number): Promise<void> {
        this.todos = this.todos.filter((t) => t.id !== id);
        await fetch(this.url + 'todos/' + id, {
            method: 'DELETE',
            body: JSON.stringify(this.todos)
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new TodoApp();
});
