# Kanban Task Board

A drag-and-drop Kanban board built with React and Vite, featuring inline task editing, priority tagging, real-time search, and persistent local storage.

## Overview

This project is a Trello-style task management board that organizes work into three columns - **To Do**, **In Progress**, and **Done**. It was built to demonstrate core React concepts: component architecture, unidirectional state management with `useState`, prop drilling, and controlled forms, with zero direct DOM manipulation.

## Live Demo
https://task-manager-yaan.vercel.app/

## Features

| Feature | Description |
|---|---|
| **Three-column board** | Clean separation of work into To Do / In Progress / Done |
| **Add tasks** | Create a task with a title and priority level |
| **Delete tasks** | Remove any card from the board instantly |
| **Move tasks** | Shift a card forward or backward a column with one click |
| **Drag and drop** | Reorder and reassign cards natively (HTML5 Drag and Drop API — no external dependency) |
| **Inline editing** | Click any task's text to edit it in place |
| **Priority levels** | Tag tasks High / Medium / Low, each with a distinct color accent |
| **Live search** | Filter visible tasks across all columns as you type |
| **Persistent storage** | Board state is saved to `localStorage` and restored on reload |
| **Responsive layout** | Adapts from desktop grid to single-column mobile view |

## Tech Stack

- **React 18** — UI library, functional components, hooks
- **Vite 5** — build tool and dev server
- **Vanilla CSS** — custom design system (no UI framework dependency)
- **HTML5 Drag and Drop API** — native drag interactions

## Roadmap

- [ ] Multi-select and bulk actions
- [ ] Due dates and reminders
- [ ] Column-level task limits (WIP limits)

