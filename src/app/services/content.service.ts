import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  duration: string;
  category: string;
}

export interface Category {
  id: string;
  name: string;
  videos: Video[];
}

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private mockVideos: Video[] = [
    {
      id: '1',
      title: 'Stacked by Summer - Day 1',
      thumbnail: 'assets/thumbnails/stacked-1.jpg',
      description: 'Get ready for an intense workout session',
      duration: '30 mins',
      category: 'Workout'
    },
    {
      id: '2',
      title: 'Heat It Up Challenge - Day 1',
      thumbnail: 'assets/thumbnails/heat-1.jpg',
      description: 'Holiday special workout program',
      duration: '45 mins',
      category: 'Challenge'
    },
    {
      id: '3',
      title: '90 Day Challenge - Day 35',
      thumbnail: 'assets/thumbnails/90day-35.jpg',
      description: 'Keep pushing through your transformation',
      duration: '60 mins',
      category: 'Challenge'
    },
    {
      id: '4',
      title: '90 Day Challenge - Day 35',
      thumbnail: 'assets/thumbnails/90day-35.jpg',
      description: 'Keep pushing through your transformation',
      duration: '60 mins',
      category: 'Challenge'
    },
    {
      id: '5',
      title: '90 Day Challenge - Day 35',
      thumbnail: 'assets/thumbnails/90day-35.jpg',
      description: 'Keep pushing through your transformation',
      duration: '60 mins',
      category: 'Challenge'
    },
    {
      id: '6',
      title: '90 Day Challenge - Day 35',
      thumbnail: 'assets/thumbnails/90day-35.jpg',
      description: 'Keep pushing through your transformation',
      duration: '60 mins',
      category: 'Challenge'
    }
  ];

  private mockCategories: Category[] = [
    {
      id: '1',
      name: 'Featured',
      videos: this.mockVideos
    },
    {
      id: '2',
      name: 'Trending',
      videos: this.mockVideos.slice(0, 2)
    },
    {
      id: '3',
      name: 'New Releases',
      videos: this.mockVideos.slice(1)
    },
    {
      id: '4',
      name: 'New Releases 2',
      videos: this.mockVideos.slice(1)
    },
    {
      id: '5',
      name: 'New Releases 5',
      videos: this.mockVideos.slice(1)
    },
    {
      id: '6',
      name: 'New Releases 6',
      videos: this.mockVideos.slice(1)
    }
  ];

  constructor() { }

  getVideos(): Observable<Video[]> {
    return of(this.mockVideos);
  }

  getCategories(): Observable<Category[]> {
    return of(this.mockCategories);
  }

  getVideoById(id: string): Observable<Video | undefined> {
    return of(this.mockVideos.find(video => video.id === id));
  }
} 