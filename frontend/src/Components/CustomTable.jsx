import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  SvgIcon,
} from "@mui/material";
import { AiFillEdit ,AiFillEye,AiFillDelete} from "react-icons/ai";

const GeneralTable = ({ columns, data, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.field}>{column.header}</TableCell>
            ))}
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row._id}>
              {columns.map((column, colIndex) => (
                <TableCell key={colIndex}>{row[column.field]}</TableCell>
              ))}
              <TableCell>
                <IconButton onClick={() => onEdit(row._id)}>
                <AiFillEdit size={20} color="blue" />
                </IconButton>
                <IconButton onClick={() => onDelete(row._id)}>
                  <AiFillDelete size={20} color="red" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GeneralTable;
