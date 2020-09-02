import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ChannelService } from './services/channel/channel.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'livri';

  constructor(
    public authService: AuthService,
    public channelService: ChannelService
  ) { }
    
}
