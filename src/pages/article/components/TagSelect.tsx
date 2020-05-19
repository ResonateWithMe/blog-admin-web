// /**
//  * @description TagSelect
//  * @author ShiLin
//  * @date 2020/5/19 11:47
//  */
// import React from 'react';
// import {Tag} from 'antd';
// import {Tag as TagType} from '@/interfaces/tag'
//
// const {CheckableTag} = Tag;
//
// interface TagSelectProps {
//   tags: TagType[] | undefined;
//   selectedTags: TagType[];
//   setSelectedTags: (data: number[]) => void;
// }
//
// const TagSelect: React.FC<TagSelectProps> = (props: TagSelectProps) => {
//   const {tags,selectedTags, setSelectedTags} = props;
//
//   const handleChange = (tag: TagType, checked: boolean) => {
//     const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tagId);
//     console.log('You are interested in: ', nextSelectedTags);
//     setSelectedTags(nextSelectedTags);
//   }
//
//   return (
//     <>
//       <span style={{marginRight: 8}}>Categories:</span>
//       { tags?.length && tags.map(tag => (
//         <CheckableTag
//           key={tag.tagId}
//           checked={selectedTags.indexOf(tag.tagId) > -1}
//           onChange={checked => handleChange(tag, checked)}
//         >
//           {tag.tagName}
//         </CheckableTag>
//       ))}
//     </>
//   );
// }
//
// export default TagSelect;
