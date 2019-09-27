import { injectable, inject } from "inversify";
import { CommandContribution, CommandRegistry, MenuContribution, MenuModelRegistry } from "@theia/core/lib/common";
import { MAIN_MENU_BAR } from '@theia/core';
import { TerminalService } from '@theia/terminal/lib/browser/base/terminal-service';
import { TerminalWidgetOptions } from '@theia/terminal/lib/browser/base/terminal-widget';

export namespace XBVRMenus {
    export const XBVR = [...MAIN_MENU_BAR, '7_xbvr'];
    export const XBVR_MODD = [...XBVR, '1_xbvr'];
}

export const XBVRCommandModd = {
    id: 'XBVRCommand.modd',
    label: "Start modd"
};

@injectable()
export class XBVRExtensionCommandContribution implements CommandContribution {

    //Need to Save in Cookie Later + Periodic Refresh
    isModdStarted: boolean = false;

    constructor(
        @inject(TerminalService) private readonly terminalService: TerminalService
    ) { }

    registerCommands(registry: CommandRegistry): void {
        registry.registerCommand(XBVRCommandModd, {
            execute: async () => {
	      const terminalOptions: TerminalWidgetOptions = {
	        title: "XBVR modd",
		destroyTermOnClose: true,
		useServerTitle: false
              }
              const terminalWidget = await this.terminalService.newTerminal(terminalOptions);
	      await terminalWidget.start();
	      await sleep(1000)
	      await terminalWidget.sendText("modd \n")
	      await this.terminalService.activateTerminal(terminalWidget);
              this.isModdStarted = true;
            },
	    isEnabled: () => !this.isModdStarted
        });
    }
}

@injectable()
export class XBVRExtensionMenuContribution implements MenuContribution {

    registerMenus(menus: MenuModelRegistry): void {
        menus.registerSubmenu(XBVRMenus.XBVR, 'XBVR');
        menus.registerMenuAction(XBVRMenus.XBVR_MODD, {
            commandId: XBVRCommandModd.id,
	    label: 'Start modd',
	    order: '0'
        });
    }
}

async function sleep(duration: number) {

    await new Promise(resolve => {
        setTimeout(resolve, duration);
    })

    return;
} 
