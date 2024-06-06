import { Table, TableBody, TableCell, TableRow, TableHead, TableContainer } from '@mui/material';
import Paper from '@mui/material/Paper';

interface ApartmentDetailsProps {
  description: any;
  paymentType: string;
  finished: boolean;
  finishedDate: any;
}

export const ApartmentDetailsTable: React.FC<ApartmentDetailsProps> = ({ description, paymentType, finished, finishedDate }) => {
    return(
      <>
        <TableContainer component={Paper} sx={{ border: '1px solid #CCC'}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold'}}>Apartment Details</TableCell>
              <TableCell sx={{ fontWeight: 'bold'}}>Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          <TableRow>
              <TableCell>Reception</TableCell>
              <TableCell>{description.reception}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Rooms</TableCell>
              <TableCell>{description.rooms}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Bathrooms</TableCell>
              <TableCell>{description.bathrooms}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Payment Method</TableCell>
              <TableCell>{paymentType}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Finshed</TableCell>
              <TableCell>{finished ? 'Yes' : 'No'}</TableCell>
            </TableRow>
            {finished && <TableRow >
              <TableCell>finished Date</TableCell>
              <TableCell>{finishedDate}</TableCell>
            </TableRow>
            }
          </TableBody>
        </Table>
      </TableContainer>
      </>
    );
}