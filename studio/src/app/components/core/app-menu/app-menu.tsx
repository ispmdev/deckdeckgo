import {Component, Element, h} from '@stencil/core';

import navStore from '../../../stores/nav.store';
import authStore from '../../../stores/auth.store';

import {AuthService} from '../../../services/auth/auth.service';
import {NavDirection} from '../../../stores/nav.store';

@Component({
  tag: 'app-menu',
  styleUrl: 'app-menu.scss',
  shadow: false,
})
export class AppMenu {
  @Element() el: HTMLElement;

  private authService: AuthService;

  constructor() {
    this.authService = AuthService.getInstance();
  }

  private async signIn() {
    navStore.state.nav = {
      url: '/signin' + (window && window.location ? window.location.pathname : ''),
      direction: NavDirection.FORWARD,
    };
  }

  private async signOut() {
    await this.authService.signOut();

    navStore.state.nav = {
      url: '/',
      direction: NavDirection.ROOT,
    };
  }

  render() {
    return (
      <ion-list>
        {this.renderUser()}

        {this.renderHome()}
        {this.renderDiscover()}
        {this.renderDashboard()}
        {this.renderSettings()}
        {this.renderSignInOut()}
      </ion-list>
    );
  }

  private renderUser() {
    if (authStore.state.loggedIn) {
      return (
        <ion-item class="user">
          <app-user-info avatarColSize={3}></app-user-info>
        </ion-item>
      );
    } else {
      return <ion-item class="user"></ion-item>;
    }
  }

  private renderDashboard() {
    if (authStore.state.loggedIn) {
      return (
        <ion-item button class="home" href="/dashboard" routerDirection="forward">
          <ion-icon lazy={true} name="apps-outline" slot="start"></ion-icon>
          <ion-label>Dashboard</ion-label>
        </ion-item>
      );
    } else {
      return undefined;
    }
  }

  private renderSignInOut() {
    if (authStore.state.loggedIn) {
      return (
        <ion-item button class="signout" onClick={() => this.signOut()}>
          <ion-icon lazy={true} name="log-out-outline" slot="start"></ion-icon>
          <ion-label>Sign out</ion-label>
        </ion-item>
      );
    } else {
      return (
        <ion-item button onClick={() => this.signIn()}>
          <ion-icon lazy={true} name="log-in-outline" slot="start"></ion-icon>
          <ion-label>Sign in</ion-label>
        </ion-item>
      );
    }
  }

  private renderHome() {
    return (
      <ion-item button class="home" href="/" routerDirection="forward">
        <ion-icon lazy={true} name="home-outline" slot="start"></ion-icon>
        <ion-label>Home</ion-label>
      </ion-item>
    );
  }

  private renderDiscover() {
    if (authStore.state.loggedIn) {
      return undefined;
    }

    return (
      <ion-item button class="home" href="/discover" routerDirection="forward">
        <ion-icon lazy={true} name="search-outline" slot="start"></ion-icon>
        <ion-label>Discover</ion-label>
      </ion-item>
    );
  }

  private renderSettings() {
    return (
      <ion-item button class="home" href="/settings" routerDirection="forward">
        <ion-icon lazy={true} name="settings-outline" slot="start"></ion-icon>
        <ion-label>Settings</ion-label>
      </ion-item>
    );
  }
}
