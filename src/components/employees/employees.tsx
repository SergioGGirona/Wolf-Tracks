import { useEffect } from 'react';
import { useUsers } from '../../hooks/use.users';
import { User } from '../../model/user';
import { Employee } from '../employee/employee';
import styles from './employees.module.scss';
export function Employees() {
  const { employees, loadEmployees } = useUsers();

  useEffect(() => {
    loadEmployees();
  }, [loadEmployees]);

  return (
    <ul className={styles.employeesList}>
      {employees.map((item: User) => (
        <Employee key={item.id} user={item}></Employee>
      ))}
    </ul>
  );
}
