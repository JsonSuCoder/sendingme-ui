/*
 * @Author: your name
 * @Date: 2021-11-01 15:24:30
 * @LastEditTime: 2021-11-01 22:20:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /hiseas-monorepo/packages/nft/typings.d.ts
 */
declare module '*.css';
declare module '*.scss';
declare module '*.png';
declare module '*.svg' {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>,
  ): React.ReactElement;
  const url: string;
  export default url;
}
declare module '*.tsx';