import { useState, useReducer } from 'react';
import { Plus, Trash2, Edit3, Save, X, Star, Filter, Search } from 'lucide-react';

// Complex state management with useReducer
const taskReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TASK':
            return {
                ...state,
                tasks: [...state.tasks, { ...action.payload, id: Date.now() }]
            };
        case 'UPDATE_TASK':
            return {
                ...state,
                tasks: state.tasks.map(task =>
                    task.id === action.payload.id
                        ? { ...task, ...action.payload.updates }
                        : task
                )
            };
        case 'DELETE_TASK':
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload)
            };
        case 'BATCH_UPDATE':
            return {
                ...state,
                tasks: state.tasks.map(task =>
                    action.payload.ids.includes(task.id)
                        ? { ...task, ...action.payload.updates }
                        : task
                )
            };
        case 'REORDER_TASKS':
            return {
                ...state,
                tasks: [...action.payload]
            };
        default:
            return state;
    }
};

const ComplexSpreadMapDemo = () => {
    // Complex initial state with nested objects and arrays
    const [state, dispatch] = useReducer(taskReducer, {
        tasks: [
            { id: 1, title: 'Learn React', priority: 'high', completed: false, tags: ['frontend', 'javascript'], assignee: { name: 'John', avatar: '👨‍💻' } },
            { id: 2, title: 'Build API', priority: 'medium', completed: true, tags: ['backend', 'nodejs'], assignee: { name: 'Sarah', avatar: '👩‍💻' } },
            { id: 3, title: 'Deploy App', priority: 'low', completed: false, tags: ['devops', 'aws'], assignee: { name: 'Mike', avatar: '👨‍💼' } }
        ]
    });

    const [filters, setFilters] = useState({
        priority: 'all',
        completed: 'all',
        search: '',
        tags: []
    });

    const [editingTask, setEditingTask] = useState(null);
    const [selectedTasks, setSelectedTasks] = useState([]);
    const [newTask, setNewTask] = useState({
        title: '',
        priority: 'medium',
        tags: [],
        assignee: { name: '', avatar: '👤' }
    });

    // Complex filtering with multiple conditions using map and filter
    const filteredTasks = state.tasks
        .filter(task => {
            const matchesSearch = task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                task.tags.some(tag => tag.toLowerCase().includes(filters.search.toLowerCase()));
            const matchesPriority = filters.priority === 'all' || task.priority === filters.priority;
            const matchesCompleted = filters.completed === 'all' ||
                (filters.completed === 'completed' && task.completed) ||
                (filters.completed === 'pending' && !task.completed);
            const matchesTags = filters.tags.length === 0 ||
                filters.tags.every(tag => task.tags.includes(tag));

            return matchesSearch && matchesPriority && matchesCompleted && matchesTags;
        })
        .map(task => ({
            ...task,
            // Add computed properties using spread
            urgencyScore: task.priority === 'high' ? 3 : task.priority === 'medium' ? 2 : 1,
            displayTitle: task.completed ? `✓ ${task.title}` : task.title
        }));

    // Complex form handling with nested updates
    const handleAddTask = () => {
        if (newTask.title.trim()) {
            dispatch({
                type: 'ADD_TASK',
                payload: {
                    ...newTask,
                    completed: false,
                    tags: [...newTask.tags],
                    assignee: { ...newTask.assignee }
                }
            });
            setNewTask({
                title: '',
                priority: 'medium',
                tags: [],
                assignee: { name: '', avatar: '👤' }
            });
        }
    };

    // Complex batch operations using spread and map
    const handleBatchAction = (action) => {
        switch (action) {
            case 'complete':
                dispatch({
                    type: 'BATCH_UPDATE',
                    payload: {
                        ids: selectedTasks,
                        updates: { completed: true }
                    }
                });
                break;
            case 'high-priority':
                dispatch({
                    type: 'BATCH_UPDATE',
                    payload: {
                        ids: selectedTasks,
                        updates: { priority: 'high' }
                    }
                });
                break;
            case 'delete':
                selectedTasks.forEach(id => {
                    dispatch({ type: 'DELETE_TASK', payload: id });
                });
                break;
        }
        setSelectedTasks([]);
    };

    // Complex form updates with nested object handling
    const handleTaskUpdate = (id, updates) => {
        dispatch({
            type: 'UPDATE_TASK',
            payload: {
                id,
                updates: {
                    ...updates,
                    // Ensure nested objects are properly spread
                    ...(updates.assignee && { assignee: { ...updates.assignee } }),
                    ...(updates.tags && { tags: [...updates.tags] })
                }
            }
        });
    };

    // Complex filter updates with multiple spread operations
    const updateFilters = (newFilters) => {
        setFilters(prev => ({
            ...prev,
            ...newFilters,
            // Handle array updates specially
            ...(newFilters.tags && { tags: [...newFilters.tags] })
        }));
    };

    // Get unique tags from all tasks using map and Set
    const allTags = [...new Set(state.tasks.flatMap(task => task.tags))];

    // Complex selection handling
    const handleTaskSelection = (taskId) => {
        setSelectedTasks(prev =>
            prev.includes(taskId)
                ? prev.filter(id => id !== taskId)
                : [...prev, taskId]
        );
    };

    // Priority color mapping
    const priorityColors = {
        high: 'bg-red-100 text-red-800 border-red-200',
        medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        low: 'bg-green-100 text-green-800 border-green-200'
    };

    return (
        <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
                    <Star className="text-yellow-500" />
                    Advanced Task Management
                </h1>

                {/* Complex Add Task Form */}
                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                    <h2 className="text-lg font-semibold mb-4 text-blue-800">Add New Task</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <input
                            type="text"
                            placeholder="Task title..."
                            value={newTask.title}
                            onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <select
                            value={newTask.priority}
                            onChange={(e) => setNewTask(prev => ({ ...prev, priority: e.target.value }))}
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="low">Low Priority</option>
                            <option value="medium">Medium Priority</option>
                            <option value="high">High Priority</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Assignee name..."
                            value={newTask.assignee.name}
                            onChange={(e) => setNewTask(prev => ({
                                ...prev,
                                assignee: { ...prev.assignee, name: e.target.value }
                            }))}
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            onClick={handleAddTask}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center gap-2"
                        >
                            <Plus size={16} />
                            Add Task
                        </button>
                    </div>

                    {/* Tag Selection */}
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Tags:</label>
                        <div className="flex flex-wrap gap-2">
                            {allTags.map(tag => (
                                <button
                                    key={tag}
                                    onClick={() => {
                                        setNewTask(prev => ({
                                            ...prev,
                                            tags: prev.tags.includes(tag)
                                                ? prev.tags.filter(t => t !== tag)
                                                : [...prev.tags, tag]
                                        }));
                                    }}
                                    className={`px-3 py-1 rounded-full text-sm transition-colors ${newTask.tags.includes(tag)
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        }`}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Complex Filtering System */}
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h2 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
                        <Filter size={20} />
                        Advanced Filters
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-3 text-gray-400" size={16} />
                            <input
                                type="text"
                                placeholder="Search tasks..."
                                value={filters.search}
                                onChange={(e) => updateFilters({ search: e.target.value })}
                                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <select
                            value={filters.priority}
                            onChange={(e) => updateFilters({ priority: e.target.value })}
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">All Priorities</option>
                            <option value="high">High Priority</option>
                            <option value="medium">Medium Priority</option>
                            <option value="low">Low Priority</option>
                        </select>
                        <select
                            value={filters.completed}
                            onChange={(e) => updateFilters({ completed: e.target.value })}
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">All Status</option>
                            <option value="completed">Completed</option>
                            <option value="pending">Pending</option>
                        </select>
                        <button
                            onClick={() => updateFilters({ search: '', priority: 'all', completed: 'all', tags: [] })}
                            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
                        >
                            Clear Filters
                        </button>
                    </div>
                </div>

                {/* Batch Actions */}
                {selectedTasks.length > 0 && (
                    <div className="bg-purple-50 p-4 rounded-lg mb-6">
                        <h3 className="text-lg font-semibold mb-3 text-purple-800">
                            Batch Actions ({selectedTasks.length} selected)
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => handleBatchAction('complete')}
                                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
                            >
                                Mark Complete
                            </button>
                            <button
                                onClick={() => handleBatchAction('high-priority')}
                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                            >
                                Set High Priority
                            </button>
                            <button
                                onClick={() => handleBatchAction('delete')}
                                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                            >
                                Delete Selected
                            </button>
                            <button
                                onClick={() => setSelectedTasks([])}
                                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
                            >
                                Clear Selection
                            </button>
                        </div>
                    </div>
                )}

                {/* Complex Task List with Inline Editing */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        Tasks ({filteredTasks.length})
                    </h2>

                    {filteredTasks.map(task => (
                        <div
                            key={task.id}
                            className={`p-4 rounded-lg border-2 transition-all ${selectedTasks.includes(task.id)
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-gray-200 bg-white hover:border-gray-300'
                                }`}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        checked={selectedTasks.includes(task.id)}
                                        onChange={() => handleTaskSelection(task.id)}
                                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                    />
                                    {editingTask === task.id ? (
                                        <input
                                            type="text"
                                            value={task.title}
                                            onChange={(e) => handleTaskUpdate(task.id, { title: e.target.value })}
                                            className="text-lg font-medium px-2 py-1 border border-gray-300 rounded"
                                            autoFocus
                                        />
                                    ) : (
                                        <h3 className={`text-lg font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'
                                            }`}>
                                            {task.displayTitle}
                                        </h3>
                                    )}
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${priorityColors[task.priority]}`}>
                                        {task.priority.toUpperCase()}
                                    </span>
                                    <span className="text-sm text-gray-600">
                                        Score: {task.urgencyScore}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xl">{task.assignee.avatar}</span>
                                        <span className="text-sm font-medium text-gray-700">{task.assignee.name}</span>
                                    </div>

                                    <div className="flex flex-wrap gap-1">
                                        {task.tags.map(tag => (
                                            <span
                                                key={tag}
                                                className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-xs"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleTaskUpdate(task.id, { completed: !task.completed })}
                                        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${task.completed
                                                ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                                                : 'bg-green-500 text-white hover:bg-green-600'
                                            }`}
                                    >
                                        {task.completed ? 'Undo' : 'Complete'}
                                    </button>

                                    {editingTask === task.id ? (
                                        <button
                                            onClick={() => setEditingTask(null)}
                                            className="p-2 text-green-600 hover:bg-green-50 rounded-md transition-colors"
                                        >
                                            <Save size={16} />
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => setEditingTask(task.id)}
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                                        >
                                            <Edit3 size={16} />
                                        </button>
                                    )}

                                    <button
                                        onClick={() => dispatch({ type: 'DELETE_TASK', payload: task.id })}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Statistics using complex map operations */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[
                        { label: 'Total Tasks', value: state.tasks.length, color: 'bg-blue-500' },
                        { label: 'Completed', value: state.tasks.filter(t => t.completed).length, color: 'bg-green-500' },
                        { label: 'High Priority', value: state.tasks.filter(t => t.priority === 'high').length, color: 'bg-red-500' },
                        { label: 'Avg Score', value: Math.round(state.tasks.reduce((sum, task) => sum + (task.priority === 'high' ? 3 : task.priority === 'medium' ? 2 : 1), 0) / state.tasks.length), color: 'bg-purple-500' }
                    ].map((stat, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow border">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                </div>
                                <div className={`w-12 h-12 rounded-lg ${stat.color} opacity-20`}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ComplexSpreadMapDemo;