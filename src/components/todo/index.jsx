import React from "react";
import cx from "classnames";
import { useUpdateTodoMutation } from "../../services/todo";

import styles from "./index.module.css";

export const Todo = ({ todo }) => {
  const [updateTodo, { isLoading }] = useUpdateTodoMutation();

  const { id, title, completed } = todo;

  const toggleTodoItem = () => {
    updateTodo({ id, completed: !completed });
  };

  return (
    <li
      className={cx(styles.item, {
        [styles.loading]: isLoading,
      })}
      onClick={toggleTodoItem}
    >
      {completed ? "👌" : "👋"}{" "}
      <span
        className={cx({
          [styles.completed]: completed,
        })}
      >
        {title}
      </span>
    </li>
  );
};
