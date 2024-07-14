import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { SidebarAdminComponent } from '../components/public/sidebar-admin/sidebar-admin.component';

interface Post {
  id: number;
  title: string;
  image: string;
}

@Component({
  selector: 'app-blog-posts-admin',
  standalone: true,
  imports: [NgFor, SidebarAdminComponent],
  templateUrl: './blog-posts-admin.component.html',
  styleUrl: './blog-posts-admin.component.scss'
})
export class BlogPostsAdminComponent {
  posts: Post[] = [
    { id: 1, title: 'Título do Post 1', image: 'https://via.placeholder.com/300x200' },
    { id: 2, title: 'Título do Post 2', image: 'https://via.placeholder.com/300x200' },
    { id: 3, title: 'Título do Post 3', image: 'https://via.placeholder.com/300x200' },
  ]
}


// export class BlogPostsComponent implements OnInit {
//   posts: Post[] = [
//     { id: 1, title: 'Título do Post 1', image: 'https://via.placeholder.com/300x200' },
//     { id: 2, title: 'Título do Post 2', image: 'https://via.placeholder.com/300x200' },
//     { id: 3, title: 'Título do Post 3', image: 'https://via.placeholder.com/300x200' },
//     // Adicione mais posts conforme necessário
//   ];

//   constructor(private router: Router) { }

//   ngOnInit(): void { }

//   editPost(postId: number): void {
//     this.router.navigate(['/edit', postId]);
//   }
// }