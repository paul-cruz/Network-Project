import classes from "./users.module.css";
import UserItem from "./user_item";

function UsersList() {
  return (
    <div className={classes.container}>
      <UserItem username="Usuario 1" id="u1" />
      <UserItem username="Usuario 2" id="u2" />
      <UserItem username="Usuario 3" id="u3" />
      <UserItem username="Usuario 4" id="u4" />
      <UserItem username="Usuario 5" id="u5" />
    </div>
  );
}

export default UsersList;
