import styled from 'styled-components';

export const Header = styled.header`
  text-align: center;
  background-color: #5B36AC;
  color: white;
  padding:1em 0;
`

export const HeaderPanel = styled.ul`
  display: flex;
  justify-content: space-between;
  padding:0;
  margin:0;
`

export const HeaderPanelContents = styled.li`
  display: flex;
  padding: 0.6em 0.8em;
`

export const Title = styled.h3`
  font-size:1rem;
  margin: 0;
`

export const SelectUserWidget = styled.div`
  text-align: center;
  margin: 20vh auto;
  line-height: 2;
`

export const SelectList = styled.select`
  width: 20%;
  margin-right: 1em;
  height: 30px;
  border:1px solid #ddd;
`

export const SelectButton = styled.button`
  background-color: #464052;
  color: white;
  border: none;
  padding: 0.5em;
  border-radius: 7px;
  cursor:pointer;

  :disabled{
    background:gray;
    cursor:no-drop;
  }
`