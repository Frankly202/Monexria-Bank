# 📝 Monexria Todo App

A simple, elegant, and powerful to-do list application built with React and local storage functionality.

## Features

✅ **Add Tasks** - Quickly add new tasks with priority levels and categories
✅ **Mark Complete** - Check off tasks as you complete them
✅ **Edit Tasks** - Edit task text directly from the list
✅ **Delete Tasks** - Remove tasks you no longer need
✅ **Filter Tasks** - View all, active, or completed tasks
✅ **Priority Levels** - Set tasks as Low, Medium, or High priority
✅ **Categories** - Organize tasks by category (General, Work, Personal, Shopping, Health)
✅ **Statistics** - View task completion statistics and progress
✅ **Local Storage** - All tasks are saved to your browser's local storage
✅ **Responsive Design** - Works seamlessly on desktop and mobile devices

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the todo-app directory:
```bash
cd todo-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the application:
```bash
npm start
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

## Usage

### Adding a Task
1. Type your task in the input field
2. Select a priority level (Low, Medium, or High)
3. Select a category
4. Click the "Add" button or press Enter

### Managing Tasks
- **Check off** tasks by clicking the checkbox
- **Edit** a task by clicking the ✏️ button
- **Delete** a task by clicking the 🗑️ button
- **Filter** tasks by clicking the filter buttons (All, Active, Completed)

### Statistics
- View your total tasks, active tasks, completed tasks, and progress percentage
- Statistics update in real-time as you manage your tasks

## Local Storage

All your tasks are automatically saved to your browser's local storage:
- Tasks persist between browser sessions
- No server required
- Data is stored locally on your device
- Clear your browser's local storage to reset all tasks

## Data Structure

Each todo item contains:
```javascript
{
  id: "unique-uuid",
  text: "Task description",
  completed: false,
  priority: "medium",
  category: "general",
  createdAt: "2024-01-15T10:30:00Z",
  dueDate: null
}
```

## Technologies Used

- **React** - UI library
- **UUID** - For generating unique task IDs
- **Local Storage API** - For data persistence
- **CSS3** - For styling and animations

## File Structure

```
todo-app/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── TodoForm.js
│   │   ├── TodoForm.css
│   │   ├── TodoList.js
│   │   ├── TodoList.css
│   │   ├── TodoItem.js
│   │   ├── TodoItem.css
│   │   ├── TodoStats.js
│   │   └── TodoStats.css
│   ├── hooks/
│   │   └── useTodoStorage.js
│   ├── App.js
│   ├── App.css
��   └── index.js
├── package.json
└── README.md
```

## Future Enhancements

- 📅 Add due dates and reminders
- 🏷️ Add custom categories
- 🔔 Add notifications
- 📊 Add data export/import
- 🌙 Add dark mode
- ☁️ Add cloud sync
- 📱 Create mobile app version

## License

This project is part of the Monexria Banking Application suite.

## Support

For issues or feature requests, please open an issue on GitHub.

---

**Happy Task Managing! 🚀**
