// app.component.ts
import { Component } from '@angular/core';

interface User {
  id: number;
  name: string;
}

@Component({
  selector: 'app-root',
  // templateUrl: ' <ul>
  //   <li *ngFor="let user of users; trackBy: trackByUser">
  //     <input type="text" [value]="user.name" /> (ID: {{ user.id }})
  //     <!-- The input field's state (e.g., focus, typed value) will persist with trackBy -->
  //   </li>
  // </ul> ',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  users: User[] = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' }
  ];

  nextId = 4; // For adding new users

  logActivity: string[] = [];

  constructor() {
    this.logActivity.push('Initial users loaded.');
  }

  // --- Without trackBy (default behavior) ---
  // If you were to add/remove/reorder, Angular would re-render more aggressively.

  // --- With trackBy ---
  trackByUser(index: number, user: User): number {
    console.log(`TrackBy called for user: ${user.name} (id: ${user.id})`);
    return user.id; // Return a unique identifier (the user's ID)
  }

  // --- Actions to manipulate the list ---

  addUser() {
    const newUser = { id: this.nextId++, name: `New User ${this.nextId - 1}` };
    this.users = [...this.users, newUser]; // Create a new array reference
    this.logActivity.push(`Added user: ${newUser.name}`);
  }

  removeFirstUser() {
    if (this.users.length > 0) {
      const removedUser = this.users[0];
      this.users = this.users.slice(1); // Create a new array reference
      this.logActivity.push(`Removed user: ${removedUser.name}`);
    }
  }

  reorderUsers() {
    // Simple reorder: move the first user to the end
    if (this.users.length > 1) {
      const firstUser = this.users[0];
      const restOfUsers = this.users.slice(1);
      this.users = [...restOfUsers, firstUser]; // Create a new array reference
      this.logActivity.push('Reordered users (first moved to end).');
    }
  }

  updateFirstUserName() {
    if (this.users.length > 0) {
      const updatedUsers = [...this.users]; // Create a new array reference
      updatedUsers[0] = { ...updatedUsers[0], name: updatedUsers[0].name + ' (Updated)' };
      this.users = updatedUsers;
      this.logActivity.push(`Updated first user's name: ${this.users[0].name}`);
    }
  }
}