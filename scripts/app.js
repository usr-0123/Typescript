var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var TodoApp = /** @class */ (function () {
    function TodoApp() {
        var _this = this;
        this.todos = [];
        this.url = 'http://localhost:3000/';
        this.viewTodosBtn = document.getElementById('viewTodosBtn');
        this.createTodoBtn = document.getElementById('createTodoBtn');
        this.viewTodosPage = document.getElementById('viewTodosPage');
        this.createTodoPage = document.getElementById('createTodoPage');
        this.todoList = document.getElementById('todoList');
        this.todoForm = document.getElementById('todoForm');
        this.todoInput = document.getElementById('todoInput');
        this.viewTodosBtn.addEventListener('click', function () { return _this.showPage('view'); });
        this.createTodoBtn.addEventListener('click', function () { return _this.showPage('create'); });
        this.todoForm.addEventListener('submit', function (e) { return _this.addTodoHandler(e); });
        this.loadTodos();
    }
    TodoApp.prototype.showPage = function (page) {
        if (page === 'view') {
            this.viewTodosBtn.classList.add('active');
            this.createTodoBtn.classList.remove('active');
            this.viewTodosPage.classList.add('active');
            this.createTodoPage.classList.remove('active');
        }
        else {
            this.createTodoBtn.classList.add('active');
            this.viewTodosBtn.classList.remove('active');
            this.createTodoPage.classList.add('active');
            this.viewTodosPage.classList.remove('active');
        }
    };
    TodoApp.prototype.addTodoHandler = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var todoText;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event.preventDefault();
                        todoText = this.todoInput.value.trim();
                        if (!todoText) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.createTodo(todoText)];
                    case 1:
                        _a.sent();
                        this.todoInput.value = '';
                        return [4 /*yield*/, this.loadTodos()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TodoApp.prototype.createTodo = function (text) {
        return __awaiter(this, void 0, void 0, function () {
            var newTodo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newTodo = { text: text };
                        return [4 /*yield*/, fetch(this.url + 'todos', {
                                method: 'POST',
                                body: JSON.stringify(newTodo)
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TodoApp.prototype.loadTodos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, todos;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(this.url + 'todos')];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        todos = _a.sent();
                        this.todos = todos;
                        this.renderTodos();
                        return [2 /*return*/];
                }
            });
        });
    };
    TodoApp.prototype.renderTodos = function () {
        var _this = this;
        this.todoList.innerHTML = '';
        this.todos.forEach(function (todo) {
            var li = document.createElement('li');
            li.textContent = todo.text;
            li.dataset.id = todo.id.toString();
            var editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.addEventListener('click', function () { return _this.editTodoHandler(todo.id); });
            var deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', function () { return _this.deleteTodoHandler(todo.id); });
            li.appendChild(editBtn);
            li.appendChild(deleteBtn);
            _this.todoList.appendChild(li);
        });
    };
    TodoApp.prototype.editTodoHandler = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var newText;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newText = prompt('Edit your todo');
                        if (!(newText !== null)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.editTodo(id, newText)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.loadTodos()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TodoApp.prototype.editTodo = function (id, newText) {
        return __awaiter(this, void 0, void 0, function () {
            var todo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        todo = this.todos.find(function (t) { return t.id === id; });
                        if (!todo) return [3 /*break*/, 2];
                        todo.text = newText;
                        return [4 /*yield*/, fetch(this.url + 'todos/' + id, {
                                method: 'PUT',
                                body: JSON.stringify(todo)
                            })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    TodoApp.prototype.deleteTodoHandler = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.deleteTodo(id)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.loadTodos()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TodoApp.prototype.deleteTodo = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.todos = this.todos.filter(function (t) { return t.id !== id; });
                        return [4 /*yield*/, fetch(this.url + 'todos/' + id, {
                                method: 'DELETE',
                                body: JSON.stringify(this.todos)
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return TodoApp;
}());
document.addEventListener('DOMContentLoaded', function () {
    new TodoApp();
});
