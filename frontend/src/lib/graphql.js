// GraphQL queries and mutations for Todo operations

// Fetch all todos for the authenticated user
export const GET_TODOS = `
  query GetTodos {
    todos(order_by: { created_at: desc }) {
      id
      title
      is_completed
      created_at
    }
  }
`;

// Create a new todo
export const CREATE_TODO = `
  mutation CreateTodo($title: String!) {
    insert_todos_one(object: { title: $title }) {
      id
      title
      is_completed
      created_at
    }
  }
`;

// Update a todo (toggle completion)
export const UPDATE_TODO = `
  mutation UpdateTodo($id: uuid!, $is_completed: Boolean!) {
    update_todos_by_pk(
      pk_columns: { id: $id }
      _set: { is_completed: $is_completed }
    ) {
      id
      title
      is_completed
      created_at
    }
  }
`;

// Delete a todo
export const DELETE_TODO = `
  mutation DeleteTodo($id: uuid!) {
    delete_todos_by_pk(id: $id) {
      id
    }
  }
`;
