import { XBVRExtensionCommandContribution, XBVRExtensionMenuContribution } from './xbvr-extension-contribution';
import {
    CommandContribution,
    MenuContribution
} from "@theia/core/lib/common";

import { ContainerModule } from "inversify";

export default new ContainerModule(bind => {
    // add your contribution bindings here
    
    bind(CommandContribution).to(XBVRExtensionCommandContribution);
    bind(MenuContribution).to(XBVRExtensionMenuContribution);
    
});
