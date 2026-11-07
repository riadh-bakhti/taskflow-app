# TaskFlow — Task Management Application

TaskFlow is a personal task-management web application built with **React** and
**Vite**, designed in the *Design your application* checkpoint and implemented
here for the *Develop your own application* checkpoint.

> **Live demo:** https://riadh-bakhti.github.io/taskflow-app/

## Features

- Create a task with a title, description, priority and due date
- Edit any task inline
- Delete a task
- Mark a task as done / not done
- Filter tasks: **All / Active / Completed**
- Search tasks by title
- Live statistics: total, active, completed and progress percentage
- Overdue date highlighting
- Automatic persistence in the browser's `localStorage`

## User story

> As a busy student and freelancer, I want to create, organise and prioritise my
> tasks in one place, so that I can focus on the most important work and never
> miss a deadline.

## Design

The application follows the design produced in the *Design your application*
checkpoint:

- **User stories** — 7 detailed stories with acceptance criteria
- **Use case diagram** — create, edit, delete, toggle, filter, search, statistics
  and persistence
- **Class diagram** — `Task`, `TaskList`, `StorageService`, `User`

The design is available in the
[design-your-application-checkpoint](https://github.com/riadh-bakhti/design-your-application-checkpoint)
repository.

## Technical architecture

```
src/
  App.jsx                     global state, filtering, statistics
  hooks/useLocalStorage.js    persistence service (localStorage)
  components/
    TaskForm.jsx              create / edit form
    TaskList.jsx              list + empty state
    TaskItem.jsx              task card (toggle, edit, delete)
    FilterBar.jsx             tabs + search + clear completed
    Stats.jsx                 counters + progress bar
```

### Task model

```js
{
  id: 'uuid',
  title: 'Finish the TaskFlow project',
  description: 'Implement all the user stories',
  priority: 'high',          // low | medium | high
  dueDate: '2026-11-15',     // YYYY-MM-DD
  isDone: false,
  createdAt: '2026-11-07T10:00:00.000Z'
}
```

## Run locally

```bash
npm install
npm run dev
```

Open the URL printed by Vite (usually http://localhost:5173/taskflow-app/).

## Production build

```bash
npm run build
npm run preview
```

## Deployment

The application is deployed on **GitHub Pages**:

**https://riadh-bakhti.github.io/taskflow-app/**

The production build is published from the `gh-pages` branch.

## Tech stack

| Layer | Technology |
|-------|------------|
| UI | React 18 |
| Build tool | Vite 5 |
| State | React hooks (`useState`, `useMemo`, `useEffect`) |
| Persistence | `localStorage` |
| Styling | Custom CSS (responsive) |
| Hosting | GitHub Pages |
