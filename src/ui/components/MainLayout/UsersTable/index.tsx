import { IUser } from '../../../../domain/models/IUser';
import IconWarning from '../../shared/icons/IconWarning';
import AddressCell from './AddressCell';
import CompanyCell from './CompanyCell';
import NameCell from './NameCell';
import TableHead from './TableHead';
import useUsersTable from './useUsersTable';
import LabelCell from './LabelCell';
import DownloadCell from './DownloadCell';

const UsersTable: React.FC = () => {
  const {
    actions: { handleOnErrorClick },
    states: { users, errorMessage }
  } = useUsersTable();

  return errorMessage ? (
    <div role="alert" className="alert alert-warning">
      <IconWarning />
      <span>{errorMessage}</span>
      <button type="button" className="btn btn-neutral" onClick={() => handleOnErrorClick()}>
        Try again
      </button>
    </div>
  ) : (
    <div className="overflow-x-auto">
      <table className="table table-md bg-white">
        <TableHead />
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={8} className="text-center">
                <span role="status" aria-label="Loading" className="loading loading-spinner text-primary" />
              </td>
            </tr>
          ) : (
            users.map((user: IUser) => {
              return (
                <tr key={user.id}>
                  <th>{user.id}</th>
                  <td aria-label="Name cell">
                    <NameCell user={user} />
                  </td>
                  <td aria-label="Email cell">
                    <LabelCell label={user.email} />
                  </td>
                  <td aria-label="Address cell">
                    <AddressCell address={user.address} />
                  </td>
                  <td aria-label="Phone cell">
                    <LabelCell label={user.phone} />
                  </td>
                  <td aria-label="Website cell">
                    <LabelCell label={user.website} />
                  </td>
                  <td aria-label="Company cell">
                    <CompanyCell company={user.company} />
                  </td>
                  <td aria-label="Download row">
                    <DownloadCell user={user} />
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
