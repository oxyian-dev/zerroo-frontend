import audit from './audit';
import dashboard from './dashboard';
import income from "./income";
import inventory from './inventory';
import report from './report';
import sales from './sales';
import transporters from './transporters';
import users from './users';
import verification from './verification';

const menuItems = {
    items: [dashboard, sales, users, verification, inventory, transporters, income, audit, report]
};

export default menuItems;
