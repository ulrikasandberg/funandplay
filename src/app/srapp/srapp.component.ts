import { Component, OnInit } from '@angular/core';
import { SrappService } from '../srapp.service';
import { Channel } from '../channel';

@Component({
  selector: 'app-srapp',
  templateUrl: './srapp.component.html',
  styleUrls: ['./srapp.component.css']
})
export class SrappComponent implements OnInit {

  description = 'Listar alla radiokanaler.'
  channels: Channel[];
  copyright: string;

  constructor(private srappService: SrappService) {

  }

  ngOnInit(): void {
    this.getChannels();
  }

  getChannels(): void {
    this.srappService.getChannels().subscribe(channels => this.test(channels));
  }

  test(channels): void {
    this.channels = channels.result,
    this.copyright = channels.copyright
  }

}
