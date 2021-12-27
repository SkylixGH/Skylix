import { RESTHost } from "@skylixgh/reflux-server";
import info from "./info/info";

export default function init(rest: RESTHost) {
    info(rest);
}